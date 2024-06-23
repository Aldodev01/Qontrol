import {InitializeStorage} from '@src/context/Storage';
import Instance from './Instance';
import ApiUser from './ApiUser';

const ApiAuth = () => {
  const SignIn = async (email: string, password: string) => {
    try {
      const Response = await Instance.post('login', {
        email,
        password,
      });
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        await InitializeStorage.setStringAsync('token', newResponse?.token);
        await InitializeStorage.setStringAsync('userId', newResponse?.user?.id);
        await InitializeStorage.setBoolAsync('login', true);
        await ApiUser().GETUSERDETAIL(newResponse?.user?.id);
      }
      return newResponse;
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
