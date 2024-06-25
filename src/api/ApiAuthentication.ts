import {InitializeStorage} from '@src/context/Storage';
import Instance from './Instance';
import ApiUser from './ApiUser';

const ApiAuth = () => {
  const SignIn = async (email: string, password: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.post('login', {
        email,
        password,
      });
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        await InitializeStorage.setStringAsync('token', newResponse?.token);
        await InitializeStorage.setStringAsync('userId', newResponse?.user?.id);
        await InitializeStorage.setBoolAsync('authentication', true);
        await ApiUser()
          .GETUSERDETAIL(newResponse?.user?.id)
          .then(() => {
            InitializeStorage.setBool('loading', false);
          });
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };
  const SignOut = async () => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.post('logout');
      const newResponse = await Response.data;
      if (newResponse?.message === 'Logout successful') {
        InitializeStorage.setString('token', '');
        InitializeStorage.setBool('login', false);
        InitializeStorage.clearMemoryCache();
        InitializeStorage.clearStore();
        InitializeStorage.setBool('loading', false);
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
