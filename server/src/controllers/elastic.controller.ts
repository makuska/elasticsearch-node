import ElasticService from "../services/elastic.service";
import { GenericElasticSearchServiceResponse } from "../services/elastic.service"

// @ts-ignore
// TODO should req and res have a type declared?
export const createIndex = async (req, res) => {
  const { indexName } = req.body;
  const result: GenericElasticSearchServiceResponse = await ElasticService.createIndex(indexName);
  res.json(result);
}

// @ts-ignore
export const listAllIndices = async (_req, res) => {
  const result: GenericElasticSearchServiceResponse | JSON = await ElasticService.listAllIndices();
  res.json(result);
}
