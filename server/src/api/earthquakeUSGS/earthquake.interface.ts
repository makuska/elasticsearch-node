import EarthquakeService from "./earthquake.service";

/**
 * EarthquakeFeatureProperties represents the essential properties of an earthquake feature.
 * It includes information such as magnitude, location, time, URL, significance, type,
 * and coordinates (longitude, latitude, and depth). The coordinates are taken from the
 * EarthquakeFeatureGeometry interface
 *
 * @interface EarthquakeFeatureProperties
 * @property {number} mag - The magnitude of the earthquake.
 * @property {string} place - The location description of the earthquake.
 * @property {number} time - The timestamp of when the earthquake occurred.
 * @property {string} url - The URL providing additional earthquake details.
 * @property {number} sig - The significance of the earthquake.
 * @property {string} type - The type of earthquake event.
 */
export interface EarthquakeFeatureProperties {
  mag: number
  place: string
  time: number
  updated: number
  tz: string | null
  url: string
  detail: string
  felt: null | number
  cdi: null | number
  mmi: null | number
  alert: null | string
  status: string
  tsunami: number
  sig: number
  net: string
  code: string
  ids: string
  sources: string
  types: string
  nst: number | null
  dmin: number
  rms: number
  gap: number
  magType: string
  type: string
  title: string
}

export type longitude = number
export type latitude = number
export type depth = number
/**
 * EarthquakeFeatureGeometry represents the geometry information of an earthquake feature.
 * It includes the geometry type and the coordinates array containing longitude, latitude, and depth.
 *
 * @interface EarthquakeFeatureGeometry
 * @property {string} type - The type of geometry (e.g., "Point").
 * @property {[longitude, latitude, depth]} coordinates - The array containing longitude, latitude, and depth.
 */
export interface EarthquakeFeatureGeometry {
  type: string
  coordinates: [longitude, latitude, depth]
}

/**
 * EarthquakeFeature represents a single earthquake feature.
 * It includes information such as the feature type, properties, geometry, and a unique identifier.
 *
 * @interface EarthquakeFeature
 * @property {string} type - The type of the earthquake feature.
 * @property {EarthquakeFeatureProperties} properties - The properties of the earthquake feature.
 * @property {EarthquakeFeatureGeometry} geometry - The geometry information of the earthquake feature.
 * @property {string} id - The unique identifier of the earthquake feature.
 */
export interface EarthquakeFeature {
  type: string
  properties: EarthquakeFeatureProperties
  geometry: EarthquakeFeatureGeometry
  id: string
}

/**
 * EarthquakeMetadata represents metadata information for earthquake data.
 * It includes details such as generation timestamp, URL, title, status, API version, and count.
 *
 * @interface EarthquakeMetadata
 * @property {number} generated - The timestamp when the earthquake data was generated.
 * @property {string} url - The URL providing access to the earthquake data.
 * @property {string} title - The title of the earthquake data.
 * @property {number} status - The status code of the earthquake data.
 * @property {string} api - The version of the API.
 * @property {number} count - The count of earthquake features in the data.
 */
export interface EarthquakeMetadata {
  generated: number
  url: string
  title: string
  status: number
  api: string
  count: number
}

/**
 * EarthquakeDataResponse represents the overall response structure for earthquake data.
 * It includes the type, metadata, an array of earthquake features, and optionally bounding box information.
 *
 * @interface EarthquakeDataResponse
 * @property {string} type - The type of the response.
 * @property {EarthquakeMetadata} metadata - The metadata information for earthquake data.
 * @property {EarthquakeFeature[]} features - An array of earthquake features.
 * @property {[number, number, number, number, number, number]} [bbox] - The bounding box information (optional).
 */
export interface EarthquakeDataResponse {
  type: string
  metadata: EarthquakeMetadata
  features: EarthquakeFeature[]
  bbox?: [number, number, number, number, number, number]
}

/**
 * EarthquakeIndexObject represents an object containing essential properties of an earthquake
 * suitable for indexing in an Elasticsearch database.
 *
 * @interface EarthquakeIndexObject
 * @property {number} mag - The magnitude of the earthquake.
 * @property {string} place - The location description of the earthquake.
 * @property {number} time - The timestamp of when the earthquake occurred.
 * @property {string} url - The URL providing additional earthquake details.
 * @property {number} sig - The significance of the earthquake.
 * @property {string} type - The type of earthquake event.
 * @property {number} depth - The depth at which the earthquake occurred.
 * @property {[number, number]} coordinates - The array containing longitude and latitude of the earthquake.
 */
export interface EarthquakeIndexObject {
  mag: number
  place: string
  time: number
  url: string
  sig: number
  type: string
  depth: number
  coordinates: [longitude, latitude]
}