import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { borrowCardApi } from 'src/apis/borrow-card.api';
import { BorrowCardType } from 'src/types/borrow-card.type';
import CreateBorrowCardDto from 'src/types/create-borrow-card.dto';
import { shortenID } from 'src/utils/utils';

const useBorrowCard = () => {
  const createBorrowCardMutation = useMutation({
    mutationFn: (body: CreateBorrowCardDto) => borrowCardApi.createBorrowCard(body),
    onSuccess: () => {
      toast.success('Create borrow card successfully');
      getAllBorrowCardQuery.refetch();
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  const getAllBorrowCardQuery = useQuery({
    queryKey: ['BorrowCardType'],
    queryFn: () => borrowCardApi.getAllBorrowCard(),
    enabled: false,
    select: data => {
      return data.data.data.doc.map((item: BorrowCardType) => {
        return {
          borrowCardId: shortenID(item._id),
          _id: item._id,
          borrower: item.borrower != null ? item.borrower.fullName : 'N/A',
          borrowDate: new Date(item.borrowDate).toLocaleDateString('en-GB'),
          expectedReturnDate: new Date(item.expectedReturnDate).toLocaleDateString('en-GB'),
          isReturned: item.isReturned ? 'Returned' : 'Borrowing'
        };
      });
    }
  });

  const getAllNotReturnedBorrowCardQuery = useQuery(
    ['NotReturnBorrowCardType'],
    () => borrowCardApi.getAllBorrowCard({ isReturned: false }),
    {
      select: data => {
        //console.log(data.data.data.doc);

        console.log(data);
        return data.data.data.doc.map((item: BorrowCardType) => {
          return {
            value: item._id,
            label: item._id,
            fullName: item.borrower.fullName,
            borrowDate: new Date(item.borrowDate).toLocaleDateString('en-GB'),
            books: item.books.map(book => {
              return {
                bookId: book.bookId._id,
                bookName: book.bookId.nameBook,
                quantity: book.quantity
              };
            }),
            expectedReturnDate: new Date(item.expectedReturnDate).toLocaleDateString('en-GB')
          };
        });
      },
      enabled: false
    }
  );

  const deleteBorrowCardMutation = useMutation({
    mutationFn: (id: string) => borrowCardApi.deleteBorrowCard(id),
    onSuccess: () => {
      toast.success('Delete borrow card successfully');
      getAllBorrowCardQuery.refetch();
    },
    onError: error => {
      toast.error(error.response.data.message);
    }
  });

  return {
    createBorrowCardMutation,
    getAllBorrowCardQuery,
    getAllNotReturnedBorrowCardQuery,
    deleteBorrowCardMutation
  };
};

export default useBorrowCard;
