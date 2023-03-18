import React, {createContext, useState, useEffect} from 'react'
import { Category } from './../models/Category';
import BooksFormSchema from '../schemas/booksSchema';
import {getCategory} from "../services/CategoriesService"
// import {getCategory} from "./../services/FakeServices/faksCategoryServices"


interface ICategoryContext{
  categories: Category[];
  
}

type CategoryProviderProps = {
  children: React.ReactNode
}

//create context 
export const CategoryContext = createContext<ICategoryContext>({
  categories: []
});

const CategoryProvider = ({children}: CategoryProviderProps) => {

  //categories state
  const [categories, setCategory] = useState<Category[]>([]);
 
  //fetch categories to update
  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getCategory();
      const newCategories = [{_id: "", name: "All Categories"}, ...categories]
      setCategory(newCategories);
    };
    fetchCategory();
  }, []);
  return (
    <CategoryContext.Provider
     value=
     {{
      categories,
    
    }}>{children}</CategoryContext.Provider>
  )
}

export default CategoryProvider