import { Button } from '@/components/button';
import { ConfirmModal } from '@/components/modal';
import { decrementQuantity, DeleteAllProductCart, incrementQuantity } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector((s) => s.all.cart);
  const [open, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  
  const toggleOpen = () => setIsOpen(!open);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (product) => {
    setSelected(product);
    toggleOpen();
  };

  const openDeleteAllModal = () => {
    setIsDeleteAllModalOpen(true);
  };

  const closeDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
  };

  const confirmDeleteAll = () => {
    dispatch(DeleteAllProductCart());
    setIsDeleteAllModalOpen(false);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="py-10 container space-y-10">
      <div className='flex items-center justify-end text-white mb-6'>
        <Button onClick={openDeleteAllModal}>Delete All Products</Button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="mb-4 text-lg text-gray-700">Savat bo‘sh</p>
          <Button onClick={handleGoHome} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700" >
            Bosh sahifaga qaytish
          </Button>
        </div>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow-md rounded-md border border-gray-200 group flex" >
            <div className="h-[300px] w-[480px] overflow-hidden">
              <img src={item?.image} alt={item.name} className="w-full h-[300px] object-cover rounded-md group-hover:scale-110 duration-300 transition-transform" />
            </div>
            <div className="flex flex-col px-4 my-1 flex-1">
              <h3 className="mb-3 font-semibold">{item.name}</h3>
              <p className="line-clamp-2 text-gray-600">{item.description}</p>
              <div className="flex items-center justify-between mt-5 mr-15">
                <strong>{formatPrice(item.price)}</strong>
                <span>{item.inStock} шт</span>
              </div>

              <div className="mt-10 flex justify-between items-center">
                <Button onClick={() => handleOpen(item)}>
                  <Trash />
                </Button>
                <div className='flex gap-5 items-center'>
                  <Button className={`w-10 ${item.quantity === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} disabled={item.quantity === 1} onClick={() => item.quantity > 1 && dispatch(decrementQuantity(item.id))} >
                    -
                  </Button>
                  <p>{item.quantity}</p>
                  <Button className="w-10" onClick={() => dispatch(incrementQuantity(item.id))} >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <ConfirmModal open={open} toggleOpen={toggleOpen} item={selected} />

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
    </div>
  );
};

export default CartPage;
