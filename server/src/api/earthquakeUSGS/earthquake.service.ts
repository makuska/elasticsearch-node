import {GenericResponse} from "../interfaces";
import {
  EarthquakeDataResponse,
  EarthquakeFeature,
  EarthquakeFeatureProperties
} from "./earthquake.interface";

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
        //TODO access the features.properties data only which contains information about the earthquake events
        const responseData: EarthquakeDataResponse = await res.json()
        const desiredData: EarthquakeFeatureProperties[] = responseData.features.map((feature: EarthquakeFeature) => feature.properties)
        return { return: desiredData, statusCode: responseData.metadata.status }
      } else {
        const errorMessage: string = await res.text()
        return { message: `An unexpected error occurred during the request: ${errorMessage}`, statusCode: res.status }
      }
    } catch (error) {
      return { message: `An error occurred while fetching the resource: ${error}`, statusCode: 500 }
    }
  }

  private async transformEarthquakeDataFromUSGS(data: JSON): Promise<void> {

  }
}

export default new EarthquakeService()