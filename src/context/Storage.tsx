import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

export const InitializeStorage = new MMKVLoader()
  .withEncryption()
  .encryptWithCustomKey('4LD0D3VV', true)
  .initialize();

export const useStorage = () => {
  const [token, setToken] = useMMKVStorage('token', InitializeStorage, '');
  const [userId, setUserId] = useMMKVStorage('userId', InitializeStorage, '');
  const [absencer, setAbsencer] = useMMKVStorage(
    'absencer',
    InitializeStorage,
    false,
  );

  const [loading, setLoading] = useMMKVStorage(
    'loading',
    InitializeStorage,
    false,
  );
  const [isLogin, setIsLogin] = useMMKVStorage(
    'authentication',
    InitializeStorage,
    false,
  );
  const [onBoard, setOnBoard] = useMMKVStorage(
    'onBoard',
    InitializeStorage,
    false,
  );

  return {
    token,
    setToken,
    isLogin,
    setIsLogin,
    onBoard,
    setOnBoard,
    userId,
    setUserId,
    loading,
    setLoading,
    absencer,
    setAbsencer,
  };
};
