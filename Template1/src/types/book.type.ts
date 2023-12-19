// export default interface Book {
//   _id: string;
//   nameBook: string;
//   typeBook: string;
//   author: string;
//   photoUrls: string[];
//   publicationYear: number;
//   publisher: string;
//   price: string;
//   ratingsAverage: number;
//   ratingsQuantity: number;
//   description: string;
//   numberOfBooks: number;
//   dateOfAcquisition: string; // You might want to use a Date type if you plan to manipulate this as a date
//   slug: string;
//   __v: number;
// }

export default interface Book {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  description: string;
  language: string;
  genres: string[];
  pages: number;
  publisher: string;
  publishDate: string;
  coverImg: string;
  price: number;
  rating: number;
}
