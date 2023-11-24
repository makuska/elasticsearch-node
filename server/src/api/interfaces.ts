/**
 * GenericResponse is a basic interface for API response structures.
 * It includes a `message` field for any relevant response messages,
 * `return` field for any return object from functions, and a
 * `statusCode` field for the HTTP status code of the response.
 *
 * @interface GenericResponse
 * @property {string} [message] - An optional message providing additional information about the response.
 * @property {any} [return] - An optional object which can be used as a return from a function.
 * @property {number} statusCode - The HTTP status code of the response.
 */
export interface GenericResponse {
  // Optional, but highly recommended
  message?: string
  // Optional return from the function
  return?: JSON
  statusCode: number
}

/**
 * ElasticSearchResponse extends the GenericResponse interface
 * with a `success` field that indicates whether the Elasticsearch operation was successful.
 *
 * @interface ElasticSearchResponse
 * @extends {GenericResponse}
 * @property {boolean} success - Indicates whether the Elasticsearch operation was successful.
 */
export interface ElasticSearchResponse extends GenericResponse {
  success: boolean
}

/**
 * GenericResponseObject is a basic interface for API response structures.
 * It includes a `success` field indicating whether the operation was successful,
 * a `message` field for any relevant response messages, and a `return` field for any return object from functions.
 *
 * @interface GenericResponseObject
 * @property {boolean} success - Indicates whether the operation was successful.
 * @property {string | undefined} [message] - An optional message providing additional information about the response.
 * @property {any} [return] - An optional object which can be used as a return from a function.
 */
export interface GenericResponseObject {
  success: boolean
  message?: string
  return?: any
}