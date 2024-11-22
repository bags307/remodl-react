import { Property } from '@/types';
import { Timestamp } from 'firebase/firestore';

// Helper function to create Timestamp
const createTimestamp = (dateString: string) => {
  return Timestamp.fromDate(new Date(dateString));
};

// Mock properties data based on actual Firestore document structure
export const mockProperties: Property[] = [
  {
    id: 'wpAkBG0HyLUGwcJlu8nU',
    address: {
      city: "Monessen",
      country: "United States",
      formattedAddress: "965 Leeds Ave, Monessen, PA 15062, USA",
      postalCode: "15062",
      state: "PA",
      street: "Leeds Avenue",
      streetNumber: "965",
      structuredAddress: {
        city: "Monessen",
        country: "United States",
        latLong: {
          __lat__: 0,
          __lon__: 0
        },
        postal_code: "15062",
        state: "PA",
        street_address_1: "965 Leeds Avenue",
        street_address_2: "Monessen, PA 15062"
      }
    },
    created_at: createTimestamp('2024-10-31T15:17:20.799Z'),
    created_by: {
      __ref__: "users/defaultUser"
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
        postal2: "2142",
        postal3: "C014"
      },
      area: {
        censusBlockGroup: "3",
        censusTractIdent: "116400",
        countrySecSubd: "Cuyahoga",
        subdName: "CRAWFORD"
      },
      assessment: {
        appraised: {},
        assessed: {
          assdImprValue: 14490,
          assdLandValue: 2140,
          assdTtlValue: 16630
        },
        improvementPercent: 87,
        market: {
          mktImprValue: 41400,
          mktLandValue: 6100,
          mktTtlValue: 47500
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
          absenteeOwnerStatus: "O",
          corporateIndicator: "Y",
          mailingAddressOneLine: "9114 YALE AVE # 9116, CLEVELAND, OH 44108-2142",
          owner1: {
            fullName: "WC HOME ACCESS OWNER OH 1 LLC",
            lastName: "WC HOME ACCESS OWNER OH 1 LLC "
          },
          owner2: {},
          owner3: {},
          owner4: {}
        },
        tax: {
          exemption: {},
          exemptiontype: {},
          taxAmt: 1289.2,
          taxPerSizeUnit: 0.47,
          taxYear: 2023
        }
      },
      building: {
        construction: {
          condition: "AVERAGE"
        },
        interior: {
          bsmtFinishedPercent: 0,
          bsmtSize: 1091
        },
        parking: {
          prkgSize: 180
        },
        rooms: {
          bathFixtures: 15,
          bathsFull: 3,
          bathsTotal: 3,
          beds: 5,
          roomsTotal: 13
        },
        size: {
          bldgSize: 2746,
          grossSize: 3837,
          grossSizeAdjusted: 2746,
          groundFloorSize: 1109,
          livingSize: 2746,
          sizeInd: "LIVING SQFT",
          universalSize: 2746
        },
        summary: {
          levels: 3,
          view: "VIEW - NONE",
          viewCode: "000"
        }
      },
      summary: {
        absenteeInd: "OWNER OCCUPIED",
        legal1: "368 CRAWFORD SL 516 WP 0515 EP MB108 PG19 MB PG MB PG",
        propClass: "Single Family Residence / Townhouse",
        propIndicator: 10,
        propLandUse: "SFR",
        propSubType: "Residential",
        propType: "SFR",
        propertyType: "SINGLE FAMILY RESIDENCE",
        yearBuilt: 1915
      }
    },
    dataSummary: {
      data: "Address: 965 Leeds Ave, Monessen, PA 15062, USA | Postal Code: 15062 | Country: United States || Organization ID: Iw4KQIBeFdLFeNJb8ldK | Firestore Project: smartestimate-cce8b || Created By: User ID: defaultUser | Firestore Project: smartestimate-cce8b || Created At: 1730387840.799000000"
    },
    featuredImage: "https://img.companycam.com/h3xJVTr0jD9LP1iu1t_oCBRMSAa-IRCbwoTP3ZSMITw/rs:fit:250:250/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS9hNDU0/MzA2Zi1jM2ZlLTQ2/NmQtOTRhZS05MWQ4/OWE0ODJlMTEuanBn.jpg",
    featuredOriginal: "https://img.companycam.com/idPi9uJY4V7gOaWGpqZEM8f1A-BhUm5nSCh6E565WsA/rs:fit:4032:4032/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS9hNDU0/MzA2Zi1jM2ZlLTQ2/NmQtOTRhZS05MWQ4/OWE0ODJlMTEuanBn.jpg",
    featuredWeb: "https://img.companycam.com/8r3KwOanNBFM1mgVmyUUAuNPKeCsYgcTVWNFOc7vH9s/rs:fit:400:400/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS9hNDU0/MzA2Zi1jM2ZlLTQ2/NmQtOTRhZS05MWQ4/OWE0ODJlMTEuanBn.jpg",
    org: {
      __ref__: "organization/Iw4KQIBeFdLFeNJb8ldK"
    },
    projects: [
      {
        __ref__: "projects/65166865"
      }
    ],
    status: 'active'
  },
  {
    id: 'waH9rIF1oJomg6wd6Zqc',
    address: {
      city: "Cleveland",
      country: "United States",
      formattedAddress: "9114 Yale Ave, Cleveland, OH 44108, USA",
      latLong: {
        __lat__: 41.53319076791589,
        __lon__: -81.6239433735609
      },
      postalCode: "44108",
      state: "OH",
      street: "Yale Avenue",
      streetNumber: "9114",
      structuredAddress: {
        city: "Cleveland",
        country: "United States",
        latLong: {
          __lat__: 41.53319076791589,
          __lon__: -81.6239433735609
        },
        postal_code: "44108",
        state: "OH",
        street_address_1: "9114 Yale Avenue",
        street_address_2: "Cleveland, OH 44108"
      }
    },
    blurhashGeneratedAt: createTimestamp('2024-10-28T12:41:49.276Z'),
    created_at: createTimestamp('2024-10-22T17:51:31.507Z'),
    created_by: {
      __ref__: "users/defaultUser"
    },
    data: {
      address: {
        country: "US",
        countrySubd: "OH",
        line1: "9114 YALE AVE",
        line2: "CLEVELAND, OH 44108",
        locality: "CLEVELAND",
        matchCode: "ExaStr",
        oneLine: "9114 YALE AVE, CLEVELAND, OH 44108",
        postal1: "44108",
        postal2: "2142",
        postal3: "C014"
      },
      area: {
        censusBlockGroup: "3",
        censusTractIdent: "116400",
        countrySecSubd: "Cuyahoga",
        subdName: "CRAWFORD"
      },
      assessment: {
        appraised: {},
        assessed: {
          assdImprValue: 14490,
          assdLandValue: 2140,
          assdTtlValue: 16630
        },
        improvementPercent: 87,
        market: {
          mktImprValue: 41400,
          mktLandValue: 6100,
          mktTtlValue: 47500
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
          absenteeOwnerStatus: "O",
          corporateIndicator: "Y",
          mailingAddressOneLine: "9114 YALE AVE # 9116, CLEVELAND, OH 44108-2142",
          owner1: {
            fullName: "WC HOME ACCESS OWNER OH 1 LLC",
            lastName: "WC HOME ACCESS OWNER OH 1 LLC "
          },
          owner2: {},
          owner3: {},
          owner4: {}
        },
        tax: {
          exemption: {},
          exemptiontype: {},
          taxAmt: 1289.2,
          taxPerSizeUnit: 0.47,
          taxYear: 2023
        }
      },
      building: {
        construction: {
          condition: "AVERAGE"
        },
        interior: {
          bsmtFinishedPercent: 0,
          bsmtSize: 1091
        },
        parking: {
          prkgSize: 180
        },
        rooms: {
          bathFixtures: 15,
          bathsFull: 3,
          bathsTotal: 3,
          beds: 5,
          roomsTotal: 13
        },
        size: {
          bldgSize: 2746,
          grossSize: 3837,
          grossSizeAdjusted: 2746,
          groundFloorSize: 1109,
          livingSize: 2746,
          sizeInd: "LIVING SQFT",
          universalSize: 2746
        },
        summary: {
          levels: 3,
          view: "VIEW - NONE",
          viewCode: "000"
        }
      },
      summary: {
        absenteeInd: "OWNER OCCUPIED",
        legal1: "368 CRAWFORD SL 516 WP 0515 EP MB108 PG19 MB PG MB PG",
        propClass: "Single Family Residence / Townhouse",
        propIndicator: 10,
        propLandUse: "SFR",
        propSubType: "Residential",
        propType: "SFR",
        propertyType: "SINGLE FAMILY RESIDENCE",
        yearBuilt: 1915
      }
    },
    dataSummary: {
      data: "Address: 9114 Yale Ave, Cleveland, OH 44108, USA | Postal Code: 44108 | Country: United States || Organization ID: Iw4KQIBeFdLFeNJb8ldK | Firestore Project: smartestimate-cce8b || Created By: User ID: defaultUser | Firestore Project: smartestimate-cce8b || Created At: 1730387840.799000000"
    },
    featuredImage: "https://img.companycam.com/9aX0pFXJwklz2gstAqkGeTAgQNa-LkHyhiYWms7sSrE/rs:fit:250:250/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS84YjQy/ZjI1OS0xZDRmLTRl/YTAtOWQ5My1iZTYw/YWVhYjExZGEuanBn.jpg",
    featuredOriginal: "https://img.companycam.com/AXH3zoe036u-EkP-STZ5k8psefYK6-AXcCanbISGWAs/rs:fit:4032:4032/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS84YjQy/ZjI1OS0xZDRmLTRl/YTAtOWQ5My1iZTYw/YWVhYjExZGEuanBn.jpg",
    featuredWeb: "https://img.companycam.com/9cSzjdRE9kwhzQBSQ9gSH6gDoZXBxBmn9zm9sT4AWU0/rs:fit:400:400/q:80/aHR0cHM6Ly9jb21w/YW55Y2FtLXBlbmRp/bmcuczMuYW1hem9u/YXdzLmNvbS84YjQy/ZjI1OS0xZDRmLTRl/YTAtOWQ5My1iZTYw/YWVhYjExZGEuanBn.jpg",
    org: {
      __ref__: "organization/Iw4KQIBeFdLFeNJb8ldK"
    },
    projects: [
      {
        __ref__: "projects/65095389"
      }
    ],
    status: 'pending'
  }
];

export function getMockProperties(): Promise<Property[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProperties);
    }, 1000);
  });
}