import { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import useSupercluster from 'use-supercluster';
import { PropertyList } from '../components/PropertyList';
import { PropertySearch } from '../components/PropertySearch';
import { PropertyFilters } from '../components/PropertyFilters';
import { PropertyCard } from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';
import { Property } from '@/types';
import { Loader2, Plus, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAppStore } from '@/store';

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Default center coordinates (Cleveland, OH)
const DEFAULT_CENTER = { lat: 41.53319076791589, lng: -81.6239433735609 };

export function Properties() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const { setChatOpen } = useAppStore();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);
  const [zoom, setZoom] = useState(10);

  const { properties, isLoading } = useProperties();

  // Convert properties to GeoJSON features
  const points = useMemo(() => {
    return properties
      .filter(property => 
        property.address.latLong && 
        property.address.latLong.__lat__ && 
        property.address.latLong.__lon__
      )
      .map((property) => ({
        type: 'Feature',
        properties: { cluster: false, propertyId: property.id, ...property },
        geometry: {
          type: 'Point',
          coordinates: [
            property.address.latLong.__lon__,
            property.address.latLong.__lat__,
          ],
        },
      }));
  }, [properties]);

  // Get clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: bounds ? [
      bounds.getSouthWest().lng(),
      bounds.getSouthWest().lat(),
      bounds.getNorthEast().lng(),
      bounds.getNorthEast().lat(),
    ] : undefined,
    zoom: zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  const onMapIdle = useCallback(() => {
    if (mapRef) {
      setBounds(mapRef.getBounds() || null);
      setZoom(mapRef.getZoom() || 10);
    }
  }, [mapRef]);

  const handleMarkerClick = useCallback((property: Property) => {
    setSelectedProperty(property);
    if (mapRef && property.address.latLong) {
      mapRef.panTo({
        lat: property.address.latLong.__lat__,
        lng: property.address.latLong.__lon__,
      });
    }
  }, [mapRef]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex justify-between items-center h-16 px-6">
          <h1 className="text-2xl font-bold">Properties</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex"
              onClick={() => {}}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setChatOpen(true)}
              title="Open Chat (⌘ + ↑)"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <ModeToggle />
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={mapOptions}
            zoom={zoom}
            center={DEFAULT_CENTER}
            onLoad={onMapLoad}
            onIdle={onMapIdle}
          >
            {clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const {
                cluster: isCluster,
                point_count: pointCount,
                propertyId,
              } = cluster.properties;

              if (isCluster) {
                return (
                  <Marker
                    key={cluster.id}
                    position={{ lat: latitude, lng: longitude }}
                    label={{
                      text: pointCount.toString(),
                      className: 'bg-primary text-primary-foreground rounded-full px-2 py-1',
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef?.setZoom(expansionZoom);
                      mapRef?.panTo({ lat: latitude, lng: longitude });
                    }}
                  />
                );
              }

              const property = properties.find(p => p.id === propertyId);
              if (!property) return null;

              return (
                <Marker
                  key={propertyId}
                  position={{ lat: latitude, lng: longitude }}
                  onClick={() => handleMarkerClick(property)}
                />
              );
            })}

            {selectedProperty && selectedProperty.address.latLong && (
              <InfoWindow
                position={{
                  lat: selectedProperty.address.latLong.__lat__,
                  lng: selectedProperty.address.latLong.__lon__,
                }}
                onCloseClick={() => setSelectedProperty(null)}
              >
                <PropertyCard property={selectedProperty} />
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

        <div className="w-[250px] border-l flex flex-col">
          <div className="p-4 border-b space-y-4">
            <PropertySearch />
            <PropertyFilters />
          </div>
          <PropertyList
            properties={properties}
            isLoading={isLoading}
            onPropertyClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  );
}