import { Button } from '@/components/button';
import { CATEGORY } from '@/constants';
import { useGetData } from '@/hooks/fetch-data';
import { addToCart } from '@/redux/slices/authSlice';
import { formatPrice } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const { data: categoryData, isLoading } = useGetData(CATEGORY);
  const cart = useSelector((s) => s.all.cart);
  const dispatch = useDispatch();
console.log(cart);

  const handleToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };
  return (
    <div className="py-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <div className="grid grid-cols-4 gap-10">
            {categoryData?.map((item) => (
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
                    <Button onClick={() => handleToCart(item)}>
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
