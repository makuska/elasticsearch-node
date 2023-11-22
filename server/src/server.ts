import express, {Express} from 'express'
import {ApiResponse} from "@elastic/elasticsearch";
import elasticClient from "./elasticClient";
import elasticSearchIndexRoute from "./api/elasticSearchIndex/elastic.route";

const app: Express = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(8080, (): void => {
  console.log('Server listening on port 8080')
  console.log("hello world")
})

async function listIndices(): Promise<void> {
  try {
    await elasticClient.cat.indices()
      .then((r: ApiResponse): void => {
        console.log(JSON.stringify(r))
      })
  } catch (e) {
    console.error("Error listing indices from elastic cluster",e)
  }
}

listIndices()

app.use(elasticSearchIndexRoute)

app.get('/hello-world', (): string => {
  return 'Hello world!'
})