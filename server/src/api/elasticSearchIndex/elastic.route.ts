import { Router } from "express";
import { createIndex, listAllIndices } from "./elastic.controller";

const elasticSearchIndexRoute: Router = Router({
  caseSensitive: false
})

const basePath: string = "/api/v1/index"

elasticSearchIndexRoute.post(basePath, createIndex);
elasticSearchIndexRoute.get(basePath, listAllIndices);

export default elasticSearchIndexRoute;
