import {GenericResponse} from "../interfaces";
import {
  EarthquakeDataResponse, EarthquakeFeature, EarthquakeIndexObject
} from "./earthquake.interface";
import elasticClient from "../../elasticClient";
import EarthquakeObject from "./earthquake.model";
import {RequestParams} from "@elastic/elasticsearch";

class EarthquakeService {
  public async fetchEarthquakeDataFromUSGS(): Promise<GenericResponse> {
    const URL: string = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson`
    try {
      const res: Response = await fetch(URL, {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

      if (res.ok) {
        const responseData: EarthquakeDataResponse = await res.json()

        for (let feature of responseData.features) {
          const earthquakeObject: EarthquakeIndexObject = await this.createEarthquakeIndexObject(feature)
          await this.indexEarthquakeData(earthquakeObject, feature.id)
        }
        return { return: 'no idea yet', statusCode: responseData.metadata.status }
      } else {
        const errorMessage: string = await res.text()
        return { message: `An unexpected error occurred during the request: ${errorMessage}`, statusCode: res.status }
      }
    } catch (error) {
      return { message: `An error occurred while fetching the resource: ${error}`, statusCode: 500 }
    }
  }

  /**
  * @Deprecated The implementation/method still works but won't be necessary in this project at the moment.
  */
  private async indexEarthquakeData(earthquakeObject: EarthquakeIndexObject, earthquakeId: string): Promise<GenericResponse> {
    console.warn("Calling deprecated function!");
    try {
      const document: RequestParams.Index = {
        index: 'earthquakes',
        id: earthquakeId,
        body: earthquakeObject,
        pipeline: 'earthquake_data_pipeline'
      }

      elasticClient.index(document, (error: Error) => {
        if (error) {
          return { statusCode: 500, message: `Failed to index earthquake document. Result: ${error}` };
        }
      })
      return { statusCode: 200, message: `Earthquake data indexed successfully!` }
      // elasticClient.index(document, (error: Error, result: any | IndexResponse) => {
      //   if (error) {
      //     return { statusCode: 500, message: `Failed to index earthquake document. Result: ${error}` };
      //   } else {
      //     return { statusCode: 200, message: `Earthquake data indexed successfully!` }
      //   }
      // })
      // ///////////////////      :)       ///////////////////
      // const response: RequestParams.Index = await elasticClient.index({
      //   index: 'earthquakes',
      //   id: earthquakeId,
      //   body: earthquakeObject,
      //   pipeline: 'earthquake_data_pipeline'
      // });

      // if (response.result === 'created' || response.result === 'updated') {
      //   return { statusCode: 200, message: `Earthquake data indexed successfully!` };
      // } else {
      //   return { statusCode: 500, message: `Failed to index earthquake data. Result: ${response.result}` };
      // }
    } catch (error) {
      return { statusCode: 500, message: `There was an error indexing data to 'earthquakes' index, e: ${error}` };
    }
  }


  private async createEarthquakeIndexObject(feature: EarthquakeFeature): Promise<EarthquakeIndexObject> {
    const { mag, place, time, url, sig, type } = feature.properties
    const [longitude, latitude, depth] = feature.geometry.coordinates

    return new EarthquakeObject(
      mag, place, time, url, sig, type, depth, [longitude, latitude]
    )
  }
}

export default new EarthquakeService()