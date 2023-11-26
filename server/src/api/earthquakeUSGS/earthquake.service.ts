import {GenericResponse} from "../interfaces";
import {
  depth, EarthquakeDataResponse, EarthquakeFeature,
  EarthquakeFeatureProperties, EarthquakeIndexObject, latitude, longitude
} from "./earthquake.interface";
import elasticClient from "../../elasticClient";
import EarthquakeObject from "./earthquake.model";

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
        //TODO THIS METHOD's SOLE PURPOSE IS TO FETCH DATA ONLY... BREAK UP THE FUNCTION INTO SMALLER FUNCTIONS!!!
        const responseData: EarthquakeDataResponse = await res.json()
        const resultsId: string = responseData.features[0].id
        const earthquakeCoordinates: [longitude, latitude, depth] = responseData.features[0].geometry.coordinates
        const desiredData: EarthquakeFeatureProperties[] = responseData.features.map((feature: EarthquakeFeature) => feature.properties)
        // TODO call out the createEarthquakeIndexObject
        await this.createEarthquakeIndexObject(responseData)
        return { return: desiredData, statusCode: responseData.metadata.status }
      } else {
        const errorMessage: string = await res.text()
        return { message: `An unexpected error occurred during the request: ${errorMessage}`, statusCode: res.status }
      }
    } catch (error) {
      return { message: `An error occurred while fetching the resource: ${error}`, statusCode: 500 }
    }
  }

  private async indexEarthquakeData(earthquakeObject: EarthquakeIndexObject, earthquakeId: string): Promise<GenericResponse> {
    try {
      await elasticClient.index({
        index: 'earthquakes',
        id: earthquakeId,
        body: earthquakeObject,
        pipeline: 'earthquake_data_pipeline'
      })

      // TODO add some additional checks to make sure that the data was indexed correctly
      return {statusCode: 200, message: `Earthquake data indexed successfully!`}
    } catch (error) {
      return {statusCode: 500, message: `There was an error indexing data to 'earthquakes' index, e: ${error}`}
    }
    
  }

  private async createEarthquakeIndexObject(earthquakeResponseData: EarthquakeDataResponse): Promise<EarthquakeIndexObject> {
    const { mag, place, time, url, sig, type } = earthquakeResponseData.features[0].properties
    const [longitude, latitude, depth] = earthquakeResponseData.features[0].geometry.coordinates

    return new EarthquakeObject(
      mag, place, time, url, sig, type, depth, [longitude, latitude]
    )
  }
}

export default new EarthquakeService()