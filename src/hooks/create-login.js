import { LOGIN } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const loginUser = async (data) => {
  const response = await axios.post(LOGIN, data);
  return response.data;
};

export const useCreateLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(loginUser, {
    mutationFn: (data) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['currentUser']);
      toast.success('Login muvaffaqiyatli amalga oshirildi');
    },
    onError: (error) => {
      console.error('Login xatosi:', error);
      toast.error('Login xatosi');
    },
  });
};
