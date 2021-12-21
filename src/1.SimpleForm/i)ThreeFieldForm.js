import React from "react";
// import './SimpleForm.css'
import { useFormik } from "formik";

function ThreeFieldForm() {
  // this will help you in manage , handle, validation and error messages.
  // useFormik hook return the object which we are store in const. this object contains property and method to manage the state.
  const formik = useFormik({
    // properties are initial value , handleChange method is formik helper to update the value. where onChange is props 
    initialValues: {
        name: "",
        email: "",
        channel: "",
      },
    onSubmit: values =>{
        console.log("form data", values);
    },
    // validate also specify by formik: Is a function which is automatically recieves the value as object.
    validate: values =>{
        //validate is a function which return the object 
        //values.name, values.email, values.channel
        // errors.name, errors.email, errors.channel
        let errors ={}
        if(!values.name){
            errors.name = 'Required'
        }
        if(!values.email){
            errors.email = 'Required'
        }  
        // else if(!/^[A-Z0-9._%]){
        //     errors.email ="Inavlid email format"
        // }
        if(!values.channel){
            errors.channel = 'Required'
        }

        return errors
    } 

  });

// Two step for handle the submission in formik
//i) specify the onSubmit on form tag and give the form tag to handle submit method 
//ii) need to read the object is pass to in useFormik hook use property onSubmit
// when press on Submit button formik automatically execute the onSubmit method.
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />{" "}
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />{" "}
        <br />
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          channel="channel"
          onChange={formik.handleChange}
          value={formik.values.value}
        />{" "}
        <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}

export default ThreeFieldForm;
