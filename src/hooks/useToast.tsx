import Toast, {ToastType} from 'react-native-toast-message';

interface TToast {
  type: ToastType;
  text1?: string;
  text2?: string;
}

export const useToast = ({type, text1, text2}: TToast) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};
