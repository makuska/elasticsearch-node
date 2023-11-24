import { Router } from "express";

const earthquakeUSGSRoute: Router = Router({
  caseSensitive: false
})

const basePath: string = "/api/v1/earthquake"

// earthquakeUSGSRoute.post(basePath, );
// earthquakeUSGSRoute.get(basePath, );

export default earthquakeUSGSRoute;
