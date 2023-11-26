import {EarthquakeIndexObject, latitude, longitude} from "./earthquake.interface";

export default class EarthquakeObject implements EarthquakeIndexObject {
  private _mag: number;
  private _place: string;
  private _time: number;
  private _url: string;
  private _sig: number;
  private _type: string;
  private _depth: number;
  private _coordinates: [longitude, latitude];


  constructor(mag: number, place: string, time: number, url: string, sig: number, type: string, depth: number, coordinates: [longitude, latitude]) {
    this._mag = mag;
    this._place = place;
    this._time = time;
    this._url = url;
    this._sig = sig;
    this._type = type;
    this._depth = depth;
    this._coordinates = coordinates;
  }


  get mag(): number {
    return this._mag;
  }

  set mag(value: number) {
    this._mag = value;
  }

  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
  }

  get time(): number {
    return this._time;
  }

  set time(value: number) {
    this._time = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get sig(): number {
    return this._sig;
  }

  set sig(value: number) {
    this._sig = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get depth(): number {
    return this._depth;
  }

  set depth(value: number) {
    this._depth = value;
  }

  get coordinates(): [longitude, latitude] {
    return this._coordinates;
  }

  set coordinates(value: [longitude, latitude]) {
    this._coordinates = value;
  }
}