import { Timestamp } from 'firebase/firestore';

export interface PropertyAddress {
  city: string;
  country: string;
  formattedAddress: string;
  latLong: {
    __lat__: number;
    __lon__: number;
  };
  postalCode: string;
  state: string;
  street: string;
  streetNumber: string;
  structuredAddress: {
    city: string;
    country: string;
    latLong: {
      __lat__: number;
      __lon__: number;
    };
    postal_code: string;
    state: string;
    street_address_1: string;
    street_address_2: string;
  };
}

export interface PropertyData {
  address: {
    country: string;
    countrySubd: string;
    line1: string;
    line2: string;
    locality: string;
    matchCode: string;
    oneLine: string;
    postal1: string;
    postal2: string;
    postal3: string;
  };
  area: {
    censusBlockGroup: string;
    censusTractIdent: string;
    countrySecSubd: string;
    subdName: string;
  };
  assessment: {
    appraised: Record<string, any>;
    assessed: {
      assdImprValue: number;
      assdLandValue: number;
      assdTtlValue: number;
    };
    improvementPercent: number;
    market: {
      mktImprValue: number;
      mktLandValue: number;
      mktTtlValue: number;
    };
    mortgage: {
      FirstConcurrent: {
        amount: number;
      };
      SecondConcurrent: {
        amount: number;
      };
    };
    owner: {
      absenteeOwnerStatus: string;
      corporateIndicator: string;
      mailingAddressOneLine: string;
      owner1: {
        fullName: string;
        lastName: string;
      };
      owner2: Record<string, any>;
      owner3: Record<string, any>;
      owner4: Record<string, any>;
    };
    tax: {
      exemption: Record<string, any>;
      exemptiontype: Record<string, any>;
      taxAmt: number;
      taxPerSizeUnit?: number;
      taxYear: number;
    };
  };
  building: {
    construction: {
      condition: string;
      constructionType?: string;
      frameType?: string;
    };
    interior: {
      fplcCount?: number;
      fplcInd?: string;
      fplcType?: string;
    };
    parking: Record<string, any>;
    rooms: {
      bathsFull: number;
      bathsTotal: number;
      beds: number;
      roomsTotal: number;
    };
    size: {
      bldgSize: number;
      grossSizeAdjusted: number;
      livingSize: number;
      sizeInd: string;
      universalSize: number;
    };
    summary: {
      levels: number;
      view: string;
      viewCode: string;
    };
  };
  summary: {
    absenteeInd: string;
    legal1: string;
    propClass: string;
    propIndicator: number;
    propLandUse: string;
    propSubType: string;
    propType: string;
    propertyType: string;
    yearBuilt: number;
  };
}

export interface Property {
  id: string;
  address: PropertyAddress;
  data: PropertyData;
  blurhashGeneratedAt?: Timestamp;
  created_at: Timestamp;
  created_by: {
    __ref__: string;
  };
  dataSummary: {
    data: string;
  };
  featuredImage: string | null;
  featuredImageBlurhash?: string;
  featuredOriginal: string | null;
  featuredOriginalBlurhash?: string;
  featuredWeb: string | null;
  featuredWebBlurhash?: string;
  org: {
    __ref__: string;
  };
  projects: Array<{
    __ref__: string;
  }>;
  status?: 'active' | 'pending' | 'completed';
}</content></file>

<boltAction type="file" filePath="src/lib/mock/properties.ts">import { Property } from '@/types';
import { Timestamp } from 'firebase/firestore';

// Helper function to create Timestamp
const createTimestamp = (dateString: string) => {
  return Timestamp.fromDate(new Date(dateString));
};

// Transform raw property data into our Property type
export const mockProperties: Property[] = [
  {
    id: 'wpAkBG0HyLUGwcJlu8nU',
    address: {
      city: "Monessen",
      country: "United States",
      formattedAddress: "965 Leeds Ave, Monessen, PA 15062, USA",
      latLong: {
        __lat__: 40.15272900000001,
        __lon__: -79.8829375
      },
      postalCode: "15062",
      state: "PA",
      street: "Leeds Avenue",
      streetNumber: "965",
      structuredAddress: {
        city: "Monessen",
        country: "United States",
        latLong: {
          __lat__: 40.15272900000001,
          __lon__: -79.8829375
        },
        postal_code: "15062",
        state: "PA",
        street_address_1: "965 Leeds Avenue",
        street_address_2: "Monessen, PA 15062"
      }
    },
    data: {
      address: {
        country: "US",
        countrySubd: "PA",
        line1: "965 LEEDS AVE",
        line2: "MONESSEN, PA 15062",
        locality: "MONESSEN",
        matchCode: "ExaStr",
        oneLine: "965 LEEDS AVE, MONESSEN, PA 15062",
        postal1: "15062",
        postal2: "1665",
        postal3: "C014"
      },
      area: {
        censusBlockGroup: "3",
        censusTractIdent: "180300",
        countrySecSubd: "Allegheny",
        subdName: "T S MAPLE BOYDSTOWN"
      },
      assessment: {
        appraised: {},
        assessed: {
          assdImprValue: 27600,
          assdLandValue: 3000,
          assdTtlValue: 30600
        },
        improvementPercent: 90,
        market: {
          mktImprValue: 27600,
          mktLandValue: 3000,
          mktTtlValue: 30600
        },
        mortgage: {
          FirstConcurrent: {
            amount: 0
          },
          SecondConcurrent: {
            amount: 0
          }
        },
        owner: {
          absenteeOwnerStatus: "A",
          corporateIndicator: "Y",
          mailingAddressOneLine: "412 W 15TH ST, NEW YORK, NY 10011-7054",
          owner1: {
            fullName: "W C HOME ACCESS OWNER PA L L C",
            lastName: "W C HOME ACCESS OWNER PA L L C "
          },
          owner2: {},
          owner3: {},
          owner4: {}
        },
        tax: {
          exemption: {},
          exemptiontype: {},
          taxAmt: 705.02,
          taxPerSizeUnit: 0.52,
          taxYear: 2024
        }
      },
      building: {
        construction: {
          condition: "AVERAGE",
          constructionType: "FRAME",
          frameType: "WOOD"
        },
        interior: {
          fplcCount: 1,
          fplcInd: "Y",
          fplcType: "YES"
        },
        parking: {},
        rooms: {
          bathsFull: 1,
          bathsTotal: 1,
          beds: 3,
          roomsTotal: 5
        },
        size: {
          bldgSize: 1358,
          grossSizeAdjusted: 1358,
          livingSize: 1358,
          sizeInd: "LIVING SQFT",
          universalSize: 1358
        },
        summary: {
          levels: 2,
          view: "VIEW - NONE",
          viewCode: "000"
        }
      },
      summary: {
        absenteeInd: "ABSENTEE(MAIL AND SITUS NOT =)",
        legal1: "T S MAPLE EXTN OF BOYDS- TOWN PLAN LOT 356 = 23.88 X 100.00 X 23.88 X 100.00 2 STY FRA HSE 814",
        propClass: "Single Family Residence / Townhouse",
        propIndicator: 10,
        propLandUse: "SFR",
        propSubType: "Residential",
        propType: "SFR",
        propertyType: "SINGLE FAMILY RESIDENCE",
        yearBuilt: 1915
      }
    },
    created_at: createTimestamp('2024-10-23T16:42:43.154Z'),
    created_by: {
      __ref__: "users/defaultUser"
    },
    featuredImage: "https://img.companycam.com/f7_Z2hdmhirSFWRpIa2lFJ4OlJXfBf4-5NpqVbspXnM/rs:fit:250:250/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS83ZGRj/MmIxMi0yMjQzLTQ0/MDMtYWFhOC0xNGJi/MGFjMzIxNzMuanBl/Zw.jpg",
    featuredWeb: "https://img.companycam.com/TSvIyMcHV6AHrfWK-7Z_x1l1Npq_xs5hasB_DSn-5kI/rs:fit:400:400/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS83ZGRj/MmIxMi0yMjQzLTQ0/MDMtYWFhOC0xNGJi/MGFjMzIxNzMuanBl/Zw.jpg",
    featuredOriginal: "https://img.companycam.com/VAUSCxRuK1IXYfZS4e7qbV73oL26Lngmw82031XX1lQ/rs:fit:4032:4032/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS83ZGRj/MmIxMi0yMjQzLTQ0/MDMtYWFhOC0xNGJi/MGFjMzIxNzMuanBl/Zw.jpg",
    org: {
      __ref__: "organization/Iw4KQIBeFdLFeNJb8ldK"
    },
    projects: [
      {
        __ref__: "projects/65095389"
      }
    ],
    status: 'active'
  }
];

export function getMockProperties(): Promise<Property[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProperties);
    }, 1000);
  });
}</content></file>

<boltAction type="file" filePath="src/lib/db/properties.ts">import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Property } from '@/types';

const COLLECTION = 'properties';

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Property : null;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Property[];
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export function subscribeToProperties(
  orgId: string,
  callback: (properties: Property[]) => void
) {
  const q = query(
    collection(db, COLLECTION),
    where('org.__ref__', '==', `organization/${orgId}`),
    orderBy('created_at', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const properties = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Property[];
    callback(properties);
  });
}

export function subscribeToProperty(
  id: string,
  callback: (property: Property | null) => void
) {
  return onSnapshot(doc(db, COLLECTION, id), (doc) => {
    callback(doc.exists() ? { id: doc.id, ...doc.data() } as Property : null);
  });
}</content></file>

<boltAction type="shell">
<command>firebase emulators:start</command>