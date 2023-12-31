import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { returnCardApi } from 'src/apis/return-form.api';
import ReturnCardDto from 'src/types/return-card.dto';
import { shortenID } from 'src/utils/utils';

const useReturnCard = () => {
  const getAllReturnCardQuery = useQuery({
    queryKey: ['ReturnCard'],
    queryFn: () => returnCardApi.getAllReturnCard(),
    select: data => {
      return data.data.data.doc.map((item: ReturnCard) => {
        let totalAmount = 0;

        item.lostBooks.forEach(lostBook => {
          totalAmount += lostBook.quantity;
        });
        return {
          returnCardId: shortenID(item._id),
          username: item.borrowBookForm.borrower.fullName,
          returnDate: new Date(item.returnDate).toLocaleDateString('en-GB'),
          expectedReturnDate: new Date(item.borrowBookForm.expectedReturnDate).toLocaleDateString(
            'en-GB'
          ),
          lostBook: totalAmount,
          fee: item.fee.toFixed(2) + '$'
        };
      });
    }
  });

  const createReturnCardMutation = useMutation(
    (data: { borrowCardId: string; data: ReturnCardDto }) =>
      returnCardApi.createReturnCard(data.borrowCardId, data.data),
    {
      onSuccess: () => {
        getAllReturnCardQuery.refetch();
        toast.success('Create Return Card Successfully');
      },
      onError: error => {
        toast.error(error.response.data.message);
      }
    }
  );

  return {
    getAllReturnCardQuery,
    createReturnCardMutation
  };
};

export default useReturnCard;
