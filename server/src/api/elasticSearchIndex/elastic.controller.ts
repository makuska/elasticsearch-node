import ElasticSearchIndexService from "./elastic.service";
import {ElasticSearchResponse} from "./elastic.interface"
import { Request, Response } from "express";

/**
 * Handles POST requests to create an Elasticsearch index with the specified name.
 * The index name is extracted from the request body. The function constructs a new response object
 * excluding the 'statusCode' from the result and sends it along with the status code.
 *
 * @param {Request} req - The request object, containing the index name in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response has been sent.
 *
 * Sample request:
 * curl -X POST \
 * http://localhost:8080/api/v1/index \
 * -H 'Content-Type: application/json' \
 * -d '{"indexName": "your_index_name"}'
 */
export const createIndex = async (req: Request, res: Response): Promise<void> => {
  const { indexName } = req.body;
  const result: ElasticSearchResponse = await ElasticSearchIndexService.createIndex(indexName)
  const { statusCode, ...resResult } = result
  res.status(statusCode).json(resResult)
}

/**
 * Handles GET requests to retrieve a list of all indices from the Elasticsearch cluster.
 * The function constructs a new response object excluding the 'statusCode' from the result
 * and sends it along with the status code.
 *
 * @param {Request} _req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the response has been sent.
 */
export const listAllIndices = async (_req: Request, res: Response): Promise<void> => {
  const result: ElasticSearchResponse = await ElasticSearchIndexService.listAllIndices()
  const { statusCode, ...resResult } = result
  res.status(statusCode).json(resResult)
}
