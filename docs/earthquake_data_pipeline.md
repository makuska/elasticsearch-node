# This is the docs for the `earthquake_data_pipeline`
Since the ful response contains way too much information, we only need to store the necessary data and this is where the ingest pipeline comes into play.

Because we are using the OSS versions of ElasticSearch and Kibana the security setup is quite a hassle, hence why the good old CLI comes to rescue.

This is the full sample response from the USGS API:
```json
   {
     "type":"Feature",
     "properties":{
        "mag":1.13,
        "place":"11km ENE of Coachella, CA",
        "time":1650316843970,
        "updated":1650317059011,
        "tz":null, 
        "url":"https://earthquake.usgs.gov/earthquakes/eventpage/ci40240408",
        "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci40240408.geojson",                
        "felt":null,
        "cdi":null,
        "mmi":null,
        "alert":null,
        "status":"automatic",
        "tsunami":0,
        "sig":20,
        "net":"ci",
        "code":"40240408",
        "ids":",ci40240408,",
        "sources":",ci,",
        "types":",nearby-cities,origin,phase-data,scitech-link,",
        "nst":37,
        "dmin":0.07687,
        "rms":0.26,
        "gap":48,
        "magType":"ml",
        "type":"earthquake",
        "title":"M 1.1 - 11km ENE of Coachella, CA"
     },
     "geometry":{
        "type":"Point",
        "coordinates":[
          -116.0736667,
          33.7276667,
          2.09
        ]

    },
     "id":"ci40240408"
   }
```

We only need this:
```json
{
  "mag": 1.13,
  "place": "11km ENE of Coachella, CA",
  "time": 2022-05-02T20:07:53.266Z,
  "url": "https://earthquake.usgs.gov/earthquakes/eventpage/ci40240408",
  "sig": 20,
  "type": "earthquake",
  "depth": 2.09,
  "coordinates": {
    "lat": 33.7276667,
    "lon": -116.0736667
  }
}
```

* The code for the [earthquake_data_pipeline](../elastic/earthquake_data_pipeline.json). This will create the elastic ingest pipeline using the [API](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/pipeline.html) instead of Kibana UI.
* After successful pipeline creation, the index with the desired mapping can be created (this can be done before the pipeline as well, the order doesn't matter) [earthquakes](../elastic/earthquakes.json).
* To test whether the pipeline actually worked, we can use the [_simulate API](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/simulate-pipeline-api.html), the code for the simulation can be found [here](../elastic/earthquake_data_pipeline_SIMULATION.json).