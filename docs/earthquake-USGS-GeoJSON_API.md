# USGS API
The main API we're using is the Past 30 days data of all earthquakes which are updated every minute:
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson

Entire output from the API in GeoJSON:
```json
{
  type: "FeatureCollection",
  metadata: {
    generated: Long Integer,
    url: String,
    title: String,
    api: String,
    count: Integer,
    status: Integer
  },
  bbox: [
    minimum longitude,
    minimum latitude,
    minimum depth,
    maximum longitude,
    maximum latitude,
    maximum depth
  ],
  features: [
    {
      type: "Feature",
      properties: {
        mag: Decimal, //1
        place: String, //2
        time: Long Integer, //3
        updated: Long Integer,
        tz: Integer,
        url: String, //4
        detail: String,
        felt:Integer,
        cdi: Decimal,
        mmi: Decimal,
        alert: String,
        status: String,
        tsunami: Integer,
        sig:Integer, //5
        net: String,
        code: String,
        ids: String,
        sources: String,
        types: String,
        nst: Integer,
        dmin: Decimal,
        rms: Decimal,
        gap: Decimal,
        magType: String,
        type: String //6
      },
      geometry: {
        type: "Point",
        coordinates: [ //this entire array
          longitude, //7
          latitude, //8
          depth //8
        ]
      },
      id: String
    },
    …
  ]
}
```

Since all the data is not necessary we only need to store the information relevant to us.
To save storage, we will only index the fields mag, place, time, url, sig(significance), type, and coordinates array which includes longitude, latitude, and depth in that order.

Since the `time` field is in Unix Epoch time(1651624173479) the data should be transformed into more human-readable timestamp. This however, can be done in the client-side as well.

```json
…
"geometry":{
  "type":"Point",
  "coordinates":[
    -122.0981674,
    37.9551659,
    8.07
  ]
}
…
```
The coordinates array will also be destructured into three new fields: `lat`, `lon` and `depth`.
The `lat` and `lon` will be stored as a `coordinates` object and `depth` will have its own field.

## Mapping for the index
`Mapping` defines how a document and its fields are indexed and stored. In some SQL DBMS there are `schemas` which are kind of similar to the mapping in elastic.

| Field name  | Description/purpose                                                                                                                                                                                                           | Typical values                                                       | Desired mapping  |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|------------------|
| coordinates | This field includes the the fields lat(latitude) and lon(longitude) of the location where the event has occurred.                                                                                                             | lat [-90.0, 90.0]<br/>lon[-180.0, 180.0]                             | geo_point        |
| depth       | The depth of the event in kilometers.                                                                                                                                                                                         | [0, 1000.0]                                                          | float            |
| mag         | The magnitude of the event.                                                                                                                                                                                                   | [-1.0, 10.0]                                                         | float            |
| sig         | A number describing how significant the event is. The larger the number the more significant the event. Significance is determined by multiple factors, some are: magnitude, maximum MMI, felt reports, and estimated impact. | [0, 1000]                                                            | short            |
| time        | Time when the event occurred. Times are reported in the milliseconds since the Epoch.                                                                                                                                         | 1651624173479                                                        | date             |
| place       | Textual description of named geographic region near the event. This may be a city name or a country/region code.                                                                                                              | "11km E of Big Bear City, CA"                                        | text and keyword |
| type        | Type of seismic event.                                                                                                                                                                                                        | "earthquake", "quarry"                                               | keyword          |
| url         | Link to the USGS Event Page.                                                                                                                                                                                                  | "url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc73965831" | `enabled`: false |


Both `lat` and `lon` are stored in coordinates, and are mainly used for two tasks:
1. to display this information on a search results card
2. to use these coordinates in Kibana (Optional)

The second task requires running geo-based queries.

Therefore, the field coordinates should be typed as geo_point([documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html)) in order for this to work.

The `sig` uses **short** datatype because this field type uses the lowest amount of disk space to store integers.

### String data types for mapping
The last three fields (`place`, `type` and `url`) all contain and use string data types.
By default, every field that contains string data type gets mapped twice as a text field and as a keyword multi-field.

Each field type is primed for different types of requests.
- `Text` field type is used for full text search.
- `keyword` field type is used for aggregations, sorting, and exact searches.

In scenarios where you do not need both field types, the default setting is wasteful. It will slow down indexing and use up more disk space.

#### place
The field `place` will be used for three purposes.
- The value of this field will be displayed on the search results card.
- The field will be used for full text search(when a user types in the location, the user input will be searched against this field to retrieve relevant data)
- Aggregation will be performed on this field to yield a table of 10 locations with the highest frequency of earthquakes

Since there is a need for both full-text search and aggregations on the field `place`, it'll have the both `text` and `keyword` types.

#### type
The value of this field will be displayed on the search results card. The field will also be used for **exact searches**.

When a user searches for a specific type of quake, the user input is searched against the field type to retrieve relevant search results.

The user is prompted to select a type from a list of options. Therefore, we can perform exact searches on this field and will map this field as keyword.

#### url
The value of the field url is only displayed on a card, and it is not used for search.

Therefore, **there is no need** to create search data structures(inverted index or doc values) for this field so we will disable this field(enabled:false).



