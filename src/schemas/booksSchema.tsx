import * as yup from 'yup'

// const categoryIdPattern = /^[0-9a-fA-F]{24}$/;

export const BooksFormSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    categoryId: yup.string().required('Category is required'),
    // categoryId: yup.string().matches(categoryIdPattern, 'Invalid category ID').required('Category is required'),
    numberInStock: yup.number().required('Number in stock is required').positive('Number in stock must be a positive number'),
    dailyRentalRate: yup.number().required('Daily rental rate is required').positive('Daily rental rate must be a positive number'),
  });

export default BooksFormSchema