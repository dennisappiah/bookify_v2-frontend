import React, {useContext, useState, useEffect} from 'react';
// import useParams
import { useParams } from 'react-router-dom';
//import CategoryContext
import { CategoryContext } from '../context/CategoryContext';
import { BookContext } from '../context/BookContext';
//import getBook by id function
import { getBook, saveBook} from '../services/FakeServices/fakeBooksService';
import CustomSelect from '../components/common/CustomSelect';
import CustomInput from '../components/common/CustomInput';
//navigate
import { useNavigate } from 'react-router-dom';

const BooksForm = () => {
  //setting id by default to new
  const { id = "new"} = useParams();
  let navigate = useNavigate();
  const {data, handleSelectChange, handleChange, errors, validateProperty, submitted} = useContext(BookContext);
  const {categories, } 
    = useContext(CategoryContext);
  const [book, setBook] = useState(
    {_id: "", 
    title: "",
    category: {_id: "",name: "",}, 
    numberInStock: 0,
    dailyRentalRate: 0
    });
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
      setIsValid(Object.values(errors).every(error => error === ''));
    }, [errors]);

  //get Book by id
  useEffect(() => {
    try {
      const fetchBook = async () => {
        const bookData  = await getBook(id);
        if (bookData) {
          setBook(bookData);
        }
      }
      fetchBook();
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        navigate('/not-found', { replace: true });
      }
    }
  }, [id]);


  //save book object
  const handleSave = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveBook(data);
    
    // setSubmitted(true);
    validateProperty("title");
    validateProperty("categoryId");
    validateProperty("numberInStock");
    validateProperty("dailyRentalRate");
    navigate('/books');
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
      <button disabled={ !isValid || submitted} type="submit" className="btn btn-primary">Save</button>
    </form>
  )
}

export default BooksForm
