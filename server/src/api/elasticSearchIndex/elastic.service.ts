import elasticClient from "../../elasticClient";
import {ApiResponse, RequestParams} from "@elastic/elasticsearch";
import {ElasticSearchResponse} from "./elastic.interface";

class ElasticSearchIndexService {

  /**
   * Creates an Elasticsearch index with the specified name. If index already exists then it'll return success: false
   * and appropriate message
   *
   * @param {string} indexName - The name of the index to be created.
   * @returns {Promise<ElasticSearchResponse>} A promise that resolves to an object containing
   * the success status and an optional message.
   *
   * @interface ElasticSearchResponse
   * @property {boolean} success - Indicates whether the index creation was successful.
   * @property {string | undefined} [message] - An optional message providing additional information about the result.
   * @property {number} [statusCode] - The HTTP status code of the response.
   * information about the result.
   */
  public async createIndex(indexName: string): Promise<ElasticSearchResponse> {
    try {
      const indexExistsParams: RequestParams.IndicesExists = { index: indexName }
      const indexExistsResponse: ApiResponse = await elasticClient.indices.exists(indexExistsParams)

      if (indexExistsResponse.body) {
        return { success: false, message: `Index: '${indexName}' already exists.`, statusCode: 409 }
      }

      const createIndexParams: RequestParams.IndicesCreate = { index: indexName }
      await elasticClient.indices.create(createIndexParams)

      return { success: true, message: `Index '${indexName}' created successfully.`, statusCode: 201 }
    } catch (error) {
      const errorMessage: string = `Error creating an index, error: ${error}`
      console.error(errorMessage)
      return { success: false, message: errorMessage, statusCode: 500 }
    }
  }

  /**
   * Retrieves a list of all indices from the Elasticsearch cluster.
   *
   * @returns {Promise<ElasticSearchResponse>} A promise that resolves to a JSON representation of the
   * indices inside ElasticSearchResponse. If successful, the response contains information about all indices.
   * If there's an error, it includes an error message.
   *
   * @interface ElasticSearchResponse
   * @property {boolean} success - Indicates whether the operation was successful.
   * @property {string | undefined} [message] - An optional message providing additional information about the result.
   * @property {any} [return] - An optional object which can be used as a return from a function.
   * @property {number} [statusCode] - The HTTP status code of the response.
   */
  public async listAllIndices(): Promise<ElasticSearchResponse> {
    try {
      const response: ApiResponse = await elasticClient.cat.indices({format: "json"});
      // "If this was intentional, convert the expression to unknown first."
      const parseResponse: JSON = response as unknown as JSON
      return { success: true, statusCode: 200, return: parseResponse }
    } catch (error) {
      const errorMessage: string = `Error listing all indices, error: ${error}`
      return { success: false, message: errorMessage, statusCode: 500 }
    }
  }
}

export default new ElasticSearchIndexService()