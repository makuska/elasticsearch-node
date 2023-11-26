import { Request, Response } from "express";
import EarthquakeService from "./earthquake.service"

export const saveEarthquakeData = async (_req: Request, res: Response): Promise<void> => {
  const result = await EarthquakeService.fetchEarthquakeDataFromUSGS()
}