export interface Book {
  _id: any;
  title: string;
  category: {
    _id: string;
    name: string;
  };
  numberInStock: number;
  dailyRentalRate: number;
  liked?: boolean;
}
