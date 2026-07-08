import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUp,RegisterFormData } from '../pages/auth/schemas/SignUp';
import { register } from '../pages/auth/serivice/authService';
import { useMutation } from '@tanstack/react-query';
import { RegisterRequest } from '../pages/auth/types/auth';
import { authStorage } from '../storage/authStorage';
import PgContext from '../context/PgContext';
import { useContext } from 'react';
import { Alert } from 'react-native';

export const useRegister = () => {
  const { setIsLogin } = useContext(PgContext);
  const {control,handleSubmit,formState: { errors, isSubmitting },watch,} = useForm<RegisterFormData>({
    resolver: zodResolver(SignUp),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      conformPassword: '',
    },
    mode: 'all',
  });

  const password = watch('password');

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
        onSuccess: async (response) => {
          const accessToken = response?.data?.accessToken;
          const refreshToken = response?.data?.refreshToken;
          if (accessToken && refreshToken) {
            await authStorage.saveTokens(accessToken, refreshToken);
            setIsLogin(true);
          } else {
            Alert.alert('Register Failed', 'Register response did not include access tokens.');
          }
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ??
            error?.response?.data?.error ??
            error?.message ??
            'Something went wrong';
          Alert.alert('Register Failed', message);
        }
  });

  const onSubmit: SubmitHandler<RegisterFormData> = data => {

    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });

  };
  return {
    control,
    errors,
    isSubmitting,
    isRegistering: registerMutation.isPending,
    password,
    handleSubmit: handleSubmit(onSubmit),
  };
};
