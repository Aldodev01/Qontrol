import Instance from './Instance';
import {navigationRef} from '@src/routes/Navigation';
import {StackActions} from '@react-navigation/native';

const ApiUser = () => {
  const GETUSERDETAIL = async (id: string) => {
    try {
      const Response = await Instance.get(`users/${id}`);
      const newResponse = await Response.data;
      if (newResponse.code === 200) {
        // replace ke halaman home
        if (navigationRef.isReady()) {
          navigationRef.dispatch(StackActions.replace('Home'));
        }
      }
      return newResponse;
    } catch (error) {
      console.log(error, 'error');
      return error;
    }
  };

  return {
    GETUSERDETAIL,
  };
};

export default ApiUser;
