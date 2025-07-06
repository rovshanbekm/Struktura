import { DOMAIN } from '@/constants';
import request from '@/services';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
const fetchData = async ({ url }) => {
  const response = await request(`${DOMAIN}/${url}`);
  return response.data;
};

export const useGetData = (url) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData({ url }),
    onError: (error) => {
      toast.error('boreee');
      console.log(error);
    },
  });
};
