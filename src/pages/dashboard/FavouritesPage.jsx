import { Button } from '@/components/button';
import { CATEGORY } from '@/constants';
import { useGetData } from '@/hooks/fetch-data';
import { DeleteAllFavoriteCart, DeleteFavouriteCart } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { Heart } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FavouritesPage = () => {
  const { isLoading } = useGetData(CATEGORY);
  const favourites = useSelector((f) => f.all.favourites);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleFavouriteDelete = (id) => {
    dispatch(DeleteFavouriteCart(id));
    toast.success("Muvaffaqiyatli o'chirildi");
  };

  const handleGoHome = () => {
    navigate('/'); 
  };

  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  const openDeleteAllModal = () => {
    setIsDeleteAllModalOpen(true);
  };

  const closeDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
  };

  const confirmDeleteAll = () => {
      dispatch(DeleteAllFavoriteCart());
      setIsDeleteAllModalOpen(false);
    };

  return (
    <div className="py-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {favourites.length === 0 ? (
            <div className="text-center mt-20">
              <p className="mb-4 text-lg text-gray-700">Hech narsa yo'q</p>
              <Button onClick={handleGoHome} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Bosh sahifaga qaytish
              </Button>
            </div>
          ) : (
            <div className="container">
              <div className='flex items-center justify-end text-white mb-6'>
                  <Button onClick={openDeleteAllModal}>Delete All Products</Button>
              </div>
              <div className="grid grid-cols-4 gap-10">
                {favourites.map((item) => (
                  <div key={item.id} className="bg-white pb-4 shadow-md rounded-md border border-gray-200 group" >
                    <div className="h-[180px] w-full overflow-hidden">
                      <img src={item?.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform" />
                    </div>
                    <div className="flex flex-col px-4 my-1">
                      <h3 className="mb-3">{item.name}</h3>
                      <p className="line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between mt-5">
                        <strong>{formatPrice(item.price)}</strong>
                        <span>{item.inStock} шт</span>
                      </div>
                      <div className="mt-10 flex justify-between">
                        <Button onClick={() => handleFavouriteDelete(item.id)}>
                          <Heart />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

           {isDeleteAllModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Hamma mahsulotlarni o'chirishni xohlaysizmi?</h2>
            <div className="flex justify-end gap-4">
              <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmDeleteAll} >
                Ha
              </Button>
              <Button className="bg-gray-300 hover:bg-gray-400" onClick={closeDeleteAllModal} >
                Yo‘q
              </Button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  )
}

export default FavouritesPage;
