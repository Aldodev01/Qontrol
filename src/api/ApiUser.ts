import {InitializeStorage} from '@src/context/Storage';
import Instance from './Instance';

const ApiUser = () => {
  const GETUSERDETAIL = async (id: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.get(`users/${id}`);
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        console.log('kena kamu3');
        InitializeStorage.setBool('loading', false);
        return newResponse;
      }
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };

  const PUTUSER = async (id: string, data: Record<string, string>) => {
    try {
      const Response = await Instance.put(`users/${id}`, data);
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
    GETUSERDETAIL,
    PUTUSER,
  };
};

export default ApiUser;
