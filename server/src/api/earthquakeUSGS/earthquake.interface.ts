export interface EarthquakeFeatureProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: string | null;
  url: string;
  detail: string;
  felt: null | any; // Modify this based on the actual structure
  cdi: null | any; // Modify this based on the actual structure
  mmi: null | any; // Modify this based on the actual structure
  alert: null | any; // Modify this based on the actual structure
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number | null;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
  title: string;
}

type longitude = number
type latitude = number
type depth = number

export interface EarthquakeFeatureGeometry {
  type: string;
  coordinates: [longitude, latitude, depth];
}

export interface EarthquakeFeature {
  type: string;
  properties: EarthquakeFeatureProperties;
  geometry: EarthquakeFeatureGeometry;
  id: string;
}

export interface EarthquakeMetadata {
  generated: number;
  url: string;
  title: string;
  status: number;
  api: string;
  count: number;
}

export interface EarthquakeDataResponse {
  type: string;
  metadata: EarthquakeMetadata;
  features: EarthquakeFeature[];
  bbox?: [number, number, number, number, number, number];
}