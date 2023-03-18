import React, {useContext, useState, useEffect} from 'react';
// import useParams
import { useParams } from 'react-router-dom';
//import CategoryContext
import { CategoryContext } from '../context/CategoryContext';
// import { getBook, saveBook} from '../services/FakeServices/fakeBooksService';
import { getBook, saveBook} from '../services/BooksService';
import CustomSelect from '../components/common/CustomSelect';
import CustomInput from '../components/common/CustomInput';
//navigate
import { useNavigate } from 'react-router-dom';
import BooksFormSchema from '../schemas/booksSchema';


const BooksForm = () => {
  //setting id by default to new
  const { id = "new"} = useParams();
  const {categories } = useContext(CategoryContext);
  const [data, setData] = useState({title: "", categoryId: "", numberInStock: 0, dailyRentalRate: 0
  });
  
  //errors state
  const [errors, setErrors] = useState({title: "", categoryId: "", numberInStock: "", dailyRentalRate: ""
  });
  const [isValid, setIsValid] = useState(false);
  //submitted state
  const [submitted, setSubmitted] = useState(false);
  let navigate = useNavigate();


  //validating Form after submission
  const validateForm = async (): Promise<boolean> => {
    try {
      await BooksFormSchema.validate(data, { abortEarly: false });
      setErrors({title: "", categoryId: "", numberInStock: "", dailyRentalRate: ""});
      return true;
    } catch (err: any) {
      const newErrors = err.inner.reduce((acc:any, curr:any) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
      setErrors(newErrors);
      return false;
    }
  };
      
  //validating individual property of account state
  const validateProperty = async (field: string) => {
    try {
      await BooksFormSchema.validateAt(field, data);
      setErrors(errors => ({ ...errors, [field]: "" }));
    } catch (err: any) {
      setErrors(errors => ({ ...errors, [field]: err.message }));
    }
  };

  //handlechange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.currentTarget;
  const newValue = (name === "numberInStock" || name== "dailyRentalRate") ? parseInt(value) || 0 : value;
  setData((prevData) => ({ ...prevData, [name]: newValue }));
  validateProperty(name);
};
  
//HandleCategorySelect Change
const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setData(data => {
    const newState = { ...data, [name]: value };
    return newState;
  });
  // validateProperty(name);
};

const mapToViewModel = (book: any) => {
  return {
    title: book.title,
    categoryId: book.categoryId,
    numberInStock: book.numberInStock,
    dailyRentalRate: book.dailyRentalRate,
  };
}

const populateBook = async() => {
  try {
    const bookId = id;
    if (bookId === "new") return;
    const data = await getBook(bookId);
    setData(mapToViewModel(data));
  } catch (ex: any) {
    if (ex.response && ex.response.status === 500) {
      navigate('/not-found', {replace: true});
    }  
  }
}

  //get Book by id
  useEffect(() => {
    populateBook();
  }, [id]);

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [data, submitted]);

//save book object
const handleSave = async(e : React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await saveBook(data);
  // for  full reloading the application after save
  window.location = '/' as unknown as Location;
};
  
  return (
    <form onSubmit={handleSave} className='container'>
      <CustomInput 
      name='title' 
      value={data.title} 
      error={errors.title} 
      label="Title" 
      type='text'
      onChange={handleChange}
      />
      <CustomSelect 
      name="categoryId" 
      options={categories}  
      label='Category' 
      error={errors.categoryId}
      onChange={handleSelectChange}
       />
      <CustomInput 
      name='numberInStock' 
      value={data.numberInStock } 
      error={errors.numberInStock} 
      label="Number In Stock" 
      type='number'
      onChange={handleChange}
      />
      <CustomInput 
       name='dailyRentalRate' 
       value={data.dailyRentalRate } 
       error={errors.dailyRentalRate} 
       label="Rate" 
       type='number'
       onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  )
}

export default BooksForm
