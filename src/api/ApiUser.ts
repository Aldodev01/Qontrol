import {InitializeStorage} from '@src/context/Storage';
import Instance from './Instance';
import {TEditProfile} from '@src/screens/EditProfileScreen/EditProfileType';
import {Asset} from 'react-native-image-picker';

const ApiUser = () => {
  const GETUSERDETAIL = async (id: string, token: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.get(`users/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const newResponse = await Response.data;
      return newResponse;
    } catch (error) {
      InitializeStorage.setBool('loading', false);
      console.log(error, 'error');
      return error;
    }
  };

  const PUTUSER = async (id: string, data: TEditProfile, token: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const Response = await Instance.put(`users/${id}`, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const newResponse = await Response.data;
      return newResponse;
    } catch (error) {
      InitializeStorage.setBool('loading', false);
      console.log(error, 'error');
      return error;
    }
  };
  const PUTUSERPROFILE = async (id: string, file: Asset, token: string) => {
    InitializeStorage.setBool('loading', true);
    try {
      const formData = new FormData();
      formData.append('profile_pic', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      });
      const Response = await Instance.patch(`users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      const newResponse = await Response.data;
      return newResponse;
    } catch (error) {
      InitializeStorage.setBool('loading', false);
      console.log(error, 'error');
      return error;
    }
  };

  return {
    GETUSERDETAIL,
    PUTUSER,
    PUTUSERPROFILE,
  };
};

export default ApiUser;
