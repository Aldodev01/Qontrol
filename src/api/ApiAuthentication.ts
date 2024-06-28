import {InitializeStorage} from '@src/context/Storage';
import Instance from './Instance';

const ApiAuth = () => {
  const SignIn = async (email: string, password: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.post('login', {
        email,
        password,
      });
      const newResponse = await Response.data;
      return newResponse;
    } catch (error) {
      InitializeStorage.setBool('loading', false);
      console.error(error, 'error');
      return error;
    }
  };
  const SignOut = async (id: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.post(`logout/${id}`);
      const newResponse = await Response.data;
      return newResponse;
    } catch (error) {
      InitializeStorage.setBool('loading', false);
      console.error(error, 'error');
      return error;
    }
  };
  return {
    SignIn,
    SignOut,
  };
};

export default ApiAuth;
