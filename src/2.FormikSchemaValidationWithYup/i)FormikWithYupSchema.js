import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import '../App.css'

const initialValues =  {
    name: "",
    email: "",
    channel: "",
  }
const onSubmit = values =>{
    console.log('form data', values)
}

// Error method also defined in fomik
// console.log("Formik error", formik.errors);
// formik runs the validate function onchange and populate this formik.erros object 

const validate = values =>{
    let errors ={}
    if(!values.name){
        errors.name = 'Required'
    }
    if(!values.email){
        errors.email = 'Required'
    } 
    if(!values.channel){
        errors.channel = 'Required'
    }
    return errors
} 

const validateSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email('Invalid email format').required('Required!'),
    channel: Yup.string().required('Required!')
})

function FormikWithYupSchema() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validateSchema
        // validate,

    })
    // console.log('formik errors', formik.errors)
    console.log('Visited fields', formik.touched);

    return (
        <>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-control'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
        <br />
        </div>
        <div className='form-control'>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
        <br />
        </div>
        <div className='form-control'>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          channel="channel"
          onChange={formik.handleChange}
          value={formik.values.value}
          onBlur={formik.handleBlur}
        />
        {formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
        <br />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
    )
}

export default FormikWithYupSchema
