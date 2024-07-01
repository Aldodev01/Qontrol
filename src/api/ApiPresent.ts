import axios from 'axios';
import Instance from './Instance';

const ApiPresent = () => {
  const CheckIn = async (
    userId: string,
    latitude: string | number,
    longitude: string | number,
    token: string,
  ) => {
    try {
      const localDate = new Date();
      const isoString = localDate.toISOString();
      const Response = await Instance.post(
        'absences/checkin',
        {
          userId,
          latitude,
          longitude,
          time: isoString,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        console.log(newResponse, 'newResponse');
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const Checkout = async (
    userId: string,
    latitude: string,
    longitude: string,
    token: string,
  ) => {
    try {
      const localDate = new Date();
      const isoString = localDate.toISOString();
      const Response = await Instance.post(
        'absences/checkin',
        {
          userId,
          latitude,
          longitude,
          time: isoString,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        console.log(newResponse, 'newResponse');
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const GETPRESENTALL = async (token: string) => {
    try {
      const Response = await Instance.get('absences', {
        headers: {Authorization: `Bearer ${token}`},
      });
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        console.log(newResponse, 'newResponse');
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const GETPRESENTID = async (id: string, token: string) => {
    try {
      const Response = await Instance.get(`absences/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        console.log(newResponse, 'newResponse');
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const GETSUMMARIESPRESENT = async (id: string, token: string) => {
    try {
      const Response = await Instance.get(`/absences/summaries-user/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const GETDISTANCE = async (location1: number[], location2: number[]) => {
    try {
      // Make the API call
      const response = await axios.get(
        `https://us1.locationiq.com/v1/directions/driving/${location1[0]},${location1[1]};${location2[0]},${location2[1]}?key=pk.df1b7b811b5fe51e4a30da160463d4c1&steps=true&alternatives=true&geometries=polyline&overview=full&`,
      );
      const newResponse = response.data;

      return newResponse;
    } catch (error) {
      console.error('Error fetching distance:', error);
      return error;
    }
  };
  return {
    CheckIn,
    Checkout,
    GETPRESENTID,
    GETPRESENTALL,
    GETSUMMARIESPRESENT,
    GETDISTANCE,
  };
};

export default ApiPresent;
