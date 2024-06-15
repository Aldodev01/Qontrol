import {InitializeStorage} from '@src/context/Storage';
import Instance from './Instance';

const ApiAuth = () => {
  const SignIn = async () => {
    try {
      const Response = await Instance.post('login', {
        email: 'popo@example.com',
        password: 'password',
      });
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        await InitializeStorage.setStringAsync('token', newResponse?.token);
        await InitializeStorage.setBoolAsync('login', true);
      }
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const SignOut = async () => {
    try {
      const Response = await Instance.post('logout');
      const newResponse = await Response.data;
      if (newResponse?.message === 'Logout successful') {
        InitializeStorage.setString('token', '');
        InitializeStorage.setBool('login', false);
        InitializeStorage.clearMemoryCache();
        InitializeStorage.clearStore();
      }
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  return {
    SignIn,
    SignOut,
  };
};

export default ApiAuth;
