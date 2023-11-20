import { Router } from "express";
import { createIndex, listAllIndices } from "../controllers/elastic.controller";

const elasticRoute: Router = Router({
  caseSensitive: false
})

const basePath: string = "/api/v1/index"

elasticRoute.post(basePath, createIndex);
elasticRoute.get(basePath, listAllIndices);

export default elasticRoute;
