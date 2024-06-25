import Instance from './Instance';

const ApiPresent = () => {
  const CheckIn = async (
    userId: string,
    latitude: string,
    longitude: string,
  ) => {
    try {
      const localDate = new Date();
      const isoString = localDate.toISOString();
      const Response = await Instance.post('absences/checkin', {
        userId,
        latitude,
        longitude,
        time: isoString,
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
  const Checkout = async (
    userId: string,
    latitude: string,
    longitude: string,
  ) => {
    try {
      const localDate = new Date();
      const isoString = localDate.toISOString();
      const Response = await Instance.post('absences/checkin', {
        userId,
        latitude,
        longitude,
        time: isoString,
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
  return {
    CheckIn,
    Checkout,
  };
};

export default ApiPresent;
