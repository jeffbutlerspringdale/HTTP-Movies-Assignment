import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, FieldArray } from 'formik';
import * as Yup from 'yup';

const AppForm = ({errors, touched, values, handleSubmit, status  }) => {
    const [movies, setMovies] = useState([]);
    console.log(movies);

  useEffect(() => {
    if (status) {
        setMovies([...movies, status]);
    }
  }, [status]);

return (
    <div className="App-Form"> 
        <h1> Add  </h1>
            <Form> 
                <Field type='text' name='title' placeholder='title' />
                 {touched.title && errors.title && (
                <p className="error">{errors.title}</p>
                )}
                  <Field type='text' name='director' placeholder='director' />
                 {touched.director && errors.director && (
                <p className="error">{errors.director}</p>
                )}
                  <Field type='number' name='metascore' placeholder='metascore' />
                 {touched.metascore && errors.metascore && (
                <p className="error">{errors.metascore}</p>
                )}
                <FieldArray>
                  <Field type='text' name='star' placeholder='star' />
                  </FieldArray>
                 {touched.star && errors.star && (
                <p className="error">{errors.star}</p>
                )}
                <button type="submit">Submit</button>

                 {movies.map(movie => (
                 <p key={movie.id}>
                 Title: {movie.title}
                 <br/>
                 Director: {movie.director}
                 <br/>
                 Metascore: {movie.metascore}
                 <br/>
                 Stars: {movie.star}
                 </p>
                 ))}
                
            </Form>
    </div>
)
};

const FormikAppForm = withFormik({
    mapPropsToValues({ title, director, metascore, star}){
        return {
            title: title || "",
            director: director || "",
            metascore: metascore || "",
            star: star || ""
        };
    },

    validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    director: Yup.string().required(),
    metascore: Yup.string().required(),
    star: Yup.array().required()
  }),

    handleSubmit(values, { setStatus }) {
        axios
        .post("http://localhost:5000/api/movies", values)
        .then(res => {
            console.log('in form', res.data)
            setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
})(AppForm);

export default FormikAppForm