import {TUser} from '@src/types/TUser';

type Coordinates = [number, number];

export interface Waypoint {
  distance: number;
  hint: string;
  location: Coordinates;
  name: string;
}

export interface Leg {
  // Define the structure of the Leg object if needed
  // For example, steps, summary, etc.
}

export interface Route {
  distance: number;
  duration: number;
  geometry: string;
  legs: Leg[];
  weight: number;
  weight_name: string;
}

export interface TDistance {
  code: string;
  routes: Route[];
  waypoints: Waypoint[];
}

export type TAbsence = {
  id: string;
  user_id: string;
  date: string;
  time_in: string;
  time_out: string | null;
  latitude: string;
  longitude: string;
  status: string;
  user: TUser;
};
