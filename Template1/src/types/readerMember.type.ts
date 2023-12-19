export default interface Member {
  _id: string;
  fullName: string;
  readerType: string;
  address: string;
  email: string;
  user: string;
  isBorrowing: boolean;
  dateOfBirth: Date;
  cardCreatedAt: Date;
  expiredDate: Date;
}
