# Tasks
1. Containerize the Express server application and set it to listen to port 8080. Use `docker compose` as well. Instead of simply running the express server, combine the volume bind mount with nodemon for better development experience.
2. Add Elastic cluster containing of two nodes (it's quite common for production servers to use 3 nodes, but in this example two nodes are alright). Add Kibana GUI for the elasticsearch. Dockerize all services as `es01`, `es02` and `kibana`. Use version `7.10.2` as this is the last open source version.
3. Write documentation for `docker-compose.yml` Elastic and Kibana instances/containers.
4. Connect Express with ElasticSearch using the `Elasticsearch Client`. Check [API docs](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html) for typescript support and implementation.
   * **EDIT**: Since the oss version is `7.10.2`, then the client must also be compatible with the ElasticSearch distribution.
5. Move the logic away from the `server.ts` file and create routing, controllers and service files. Create elastic index and add more fault tolerance to the `elasticClient`.
6. Get ~~the API key~~(information about the API) from [USGS Earthquake API Home Page](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and familiarize with the possibilities.
   * Create mapping for the earthquake index.
7. Set up a data pipeline in Kibana which will transform the GeoJSON data accordingly, read the `earthquake-USGS-GeoJSON_API.md` in the `docs` folder for more information.
8. Solve the issue for the `req` and `res` types in the `elastic.controller.ts`, read the TODO.
<br>~~9. Apply the created `earthquake_data_pipeline` to the `earthquakes` index.~~ 
   * **EDIT**: Aligns with The new task 9. 
9. Crete a new API endpoint to get the data from the USGS API.
   9.1. Reformat API code, read the [TODO.md](server/src/api/TODO.md).