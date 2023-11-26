import {GenericResponse} from "../interfaces";

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