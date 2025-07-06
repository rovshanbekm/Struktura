import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteProduct } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export const ConfirmModal = ({ open, toggleOpen, item }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteProduct(item.id));
    toggleOpen();
    toast.success("Muvaffaqiyatli o'chirildi");
  };
  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure? {item?.name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button onClick={toggleOpen} className='mr-2 px-3 py-1 bg-black text-white'>Cancel</button>
          <button
            className="bg-red-600 text-white rounded-md px-4 py-2 font-bold"
            onClick={handleDelete}
          >
            Ha O'chir
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
