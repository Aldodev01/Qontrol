import Instance from './Instance';

const ApiLocation = () => {
  const GETLOCATIONS = async () => {
    try {
      const Response = await Instance.get('locations');
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
    GETLOCATIONS,
  };
};

export default ApiLocation;
