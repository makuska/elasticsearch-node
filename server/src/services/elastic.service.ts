import elasticClient from "../elasticClient";
import {ApiResponse, RequestParams} from "@elastic/elasticsearch";

export interface GenericElasticSearchServiceResponse {
  success: boolean;
  message?: string;
}

class ElasticService {

  /**
   * Creates an Elasticsearch index with the specified name. If index already exists then it'll return success: false
   * and appropriate message
   *
   * @param {string} indexName - The name of the index to be created.
   * @returns {Promise<IndexCreationResult>} A promise that resolves to an object containing
   * the success status and an optional message.
   *
   * @interface IndexCreationResult
   * @property {boolean} success - Indicates whether the index creation was successful.
   * @property {string | undefined} [message] - An optional message providing additional
   * information about the result.
   */
  public async createIndex(indexName: string): Promise<GenericElasticSearchServiceResponse> {
    try {
      const indexExistsParams: RequestParams.IndicesExists = { index: indexName }
      const indexExistsResponse: ApiResponse = await elasticClient.indices.exists(indexExistsParams)

      if (indexExistsResponse.body) {
        return { success: false, message: `Index '${indexName}' already exists.` }
      }

      const createIndexParams: RequestParams.IndicesCreate = { index: indexName }
      await elasticClient.indices.create(createIndexParams)

      return { success: true, message: `Index '${indexName}' created successfully.` }
    } catch (error) {
      const errorMessage: string = `Error creating an index, error: ${error}`
      console.error(errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  /**
   * Retrieves a list of all indices from the Elasticsearch cluster.
   *
   * @returns A Promise resolving to either a JSON representation of the indices or a GenericElasticSearchServiceResponse.
   * If successful, the response contains information about all indices. If there's an error, it includes an error message.
   */
  public async listAllIndices(): Promise<JSON | GenericElasticSearchServiceResponse> {
    try {
      const response: ApiResponse = await elasticClient.cat.indices({format: "json"});
      // "If this was intentional, convert the expression to unknown first."
      const parseResponse: unknown = response as unknown
      return parseResponse as JSON
      // return response.body as JSON;
    } catch (error) {
      const errorMessage: string = `Error listing all indices, error: ${error}`
      console.error(errorMessage)
      return { success: false, message: errorMessage }
    }
  }
}

export default new ElasticService()