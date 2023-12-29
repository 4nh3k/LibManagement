export interface Review {
  review: string;
  rating: number;
  book: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  _id: string;
  createdAt: string;
  __v: number;
}
