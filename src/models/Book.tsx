export interface Book {
    _id: string;
    title: string;
    category: {
        _id: string;
        name: string;
    };
    numberInStock: number;
    dailyRentalRate: number;
    liked?: boolean;
}

