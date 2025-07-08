import { Button } from '@/components/button';
import { CATEGORY } from '@/constants';
import { useGetData } from '@/hooks/fetch-data';
import { addToCart, FavouriteCart, } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { ArrowLeft, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const cart = useSelector((s) => s.all.cart);
  const favourites = useSelector((f) => f.all.favourites)
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data: categoryData, isLoading } = useGetData(CATEGORY,page);
console.log(cart);
console.log(favourites);

const [searchText, setSearchText] = useState('');


const filteredData = categoryData?.filter((item) =>
  item.name.toLowerCase().includes(searchText.toLowerCase())
);
const [likedIds, setLikedIds] = useState(() => {
  const stored = localStorage.getItem('likedIds');
  return stored ? JSON.parse(stored) : [];
});


  const handleToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };
  const handleFavourite = (item) => {
    dispatch(FavouriteCart(item));
    setLikedIds((prev) => {
      let updated;
      if (prev.includes(item.id)) {
        updated = prev.filter((id) => id !== item.id);
      } else {
        updated = [...prev, item.id];
      }
      localStorage.setItem('likedIds', JSON.stringify(updated));
  
      return updated;
    });
    toast.success(`${item.name} favourited to cart`);
  };
  return (
    <div className="py-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
           <input type="text" placeholder="Mahsulot nomi bo‘yicha qidirish..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="border px-4 py-2 rounded-md mb-6 w-full max-w-md mx-auto block" />
          <div className="grid grid-cols-4 gap-10">
            {filteredData?.map((item) => (
              <div
                key={item.id}
                className="bg-white pb-4 shadow-md rounded-md border border-gray-200 group"
              >
                <div className="h-[180px] w-full overflow-hidden">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform"
                  />
                </div>
                <div className="flex flex-col px-4 my-1">
                  <h3 className="mb-3">{item.name}</h3>
                  <p className="line-clamp-2 ">{item.description}</p>
                  <div className="flex items-center justify-between mt-5">
                    <strong>{formatPrice(item.price)}</strong>
                    <span>{item.inStock} шт</span>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button onClick={() =>{ handleToCart(item); dispatch(incrementQuantity(item.id))}}>
                    <ShoppingCart />
                    </Button>
                    <Button onClick={() => handleFavourite(item)}>
                    <Heart  color={likedIds.includes(item.id) ? 'red' : 'black'} fill={likedIds.includes(item.id) ? 'red' : 'none'}/>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-10 mt-10">
           <button
              disabled={page <= 1}
              className={`px-4 py-2 rounded-md font-bold text-xl ${
                page <= 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'bg-black text-white cursor-pointer'
              }`}
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
            >
              <ArrowLeft />
            </button> 
            {page}
            <button
              className="cursor-pointer px-4 py-2 bg-black text-white rounded-md font-bold text-xl"
              onClick={() => setPage(page + 1)}
            >
              <ArrowRight/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
