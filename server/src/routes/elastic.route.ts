import { Router } from "express"

const elasticRoute: Router = Router({
  caseSensitive: false
})

elasticRoute.post("/create-index")

export default elasticRoute