import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/AuthService";
// import useParams
import { useParams } from "react-router-dom";
//import CategoryContext
import { CategoryContext } from "../context/CategoryContext";
// import { getBook, saveBook} from '../services/FakeServices/fakeBooksService';
import { getBook, saveBook } from "../services/BooksService";
import CustomSelect from "../components/common/CustomSelect";
import BooksFormSchema from "../schemas/booksSchema";
import { Formik, Field } from "formik";

interface BookFormValues {
  title: string;
  categoryId: string;
  numberInStock: number;
  dailyRentalRate: number;
}

const BooksForm = () => {
  //setting id by default to new
  const { id = "" } = useParams();
  const { categories } = useContext(CategoryContext);
  let navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<BookFormValues>({
    title: "",
    categoryId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });

  const mapToViewModel = (book: BookFormValues) => {
    return {
      title: book.title,
      categoryId: book.categoryId,
      numberInStock: book.numberInStock,
      dailyRentalRate: book.dailyRentalRate,
    };
  };

  useEffect(() => {
    const populateBook = async () => {
      try {
        if (id === "new") return;
        const data = await getBook(id);
        setInitialValues(mapToViewModel(data));
      } catch (ex: any) {
        if (ex.response && ex.response.status === 500) {
          navigate("/not-found", { replace: true });
        }
      }
    };
    populateBook();
  }, [id]);

  const handleFormSubmit = async (values: BookFormValues) => {
    try {
      await saveBook(values);
      // for  full reloading the application after save
      window.location = "/" as unknown as Location;
    } catch (ex: any) {
      if ((ex as any).response && (ex as any).response.status === 400) {
        console.log("error");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={BooksFormSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <div className="mb-3 form-group">
            <form onSubmit={handleSubmit}>
              {/* Title field */}
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <Field
                id="title"
                name="title"
                className="form-control"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.title && errors.title ? errors.title : undefined}
              />
              {touched.title && errors.title && (
                <div className="alert alert-danger">{errors.title}</div>
              )}
              {/* Category Select field */}
              <CustomSelect
                name="categoryId"
                options={categories}
                label="Category"
                error={errors.categoryId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue("categoryId", e.target.value);
                }}
              />
              {/* Number In Stock field */}
              <label htmlFor="numberInStock" className="form-label">
                Number In Stock
              </label>
              <Field
                id="numberInStock"
                name="numberInStock"
                className="form-control"
                value={values.numberInStock}
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                error={
                  touched.numberInStock && errors.numberInStock
                    ? errors.numberInStock
                    : undefined
                }
              />
              {touched.numberInStock && errors.numberInStock && (
                <div className="alert alert-danger">{errors.numberInStock}</div>
              )}
              {/* DailyRental Rate field */}
              <label htmlFor="dailyRentalRate" className="form-label">
                Daily Rental Rate
              </label>
              <Field
                id="dailyRentalRate"
                name="dailyRentalRate"
                className="form-control"
                value={values.dailyRentalRate}
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                error={
                  touched.dailyRentalRate && errors.dailyRentalRate
                    ? errors.dailyRentalRate
                    : undefined
                }
              />
              {touched.dailyRentalRate && errors.dailyRentalRate && (
                <div className="alert alert-danger">
                  {errors.dailyRentalRate}
                </div>
              )}
              <div style={{ marginTop: "15px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default BooksForm;
