import * as yup from "yup";

// const categoryIdPattern = /^[0-9a-fA-F]{24}$/;

export const BooksFormSchema = yup.object().shape({
  title: yup.string().required("title is a required field"),
  categoryId: yup.string().required("category is a required field"),
  // categoryId: yup.string().matches(categoryIdPattern, 'Invalid category ID').required('Category is required'),
  numberInStock: yup
    .number()
    .required("numberInStock is a required field")
    .positive("Number in stock must be a positive number"),
  dailyRentalRate: yup
    .number()
    .required("dailyRentalRate is a required field")
    .positive("Daily rental rate must be a positive number"),
});

export default BooksFormSchema;
