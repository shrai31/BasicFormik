import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function FormikContainer() {
  const dropdownoptions = [
    {key:'select an option', value:''},
    {key:'option 1', value:'option 1'},
    {key:'option 2', value:'option 2'},
    {key:'option 3', value:'option 3'}
  ]
  const radioOptions = [
    {key:'option 1', value:'roption 1'},
    {key:'option 2', value:'roption 2'},
    {key:'option 3', value:'roption 3'}
  ]
  const checkboxOptions = [
    {key:'option 1', value:'checkoption 1'},
    {key:'option 2', value:'checkoption 2'},
    {key:'option 3', value:'checkoption 3'}
  ]
  const initialValues = {
    email: "",
    description:'',
    select:'',
    radioOption:'',
    checkboxOption: [],
  };
  const validateSchema = Yup.object().shape({
    email: Yup.string().email('invalid').required("Required"),
    description: Yup.string().required("Required"),
    select: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    checkboxOption: Yup.string.required("Required"),
  });
  const onSubmit = (values) => console.log("form Data", values);
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validateSchema}
    onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
            control="select"
            label="Select"
            name="select"
            options={dropdownoptions}
          />
          
          <FormikControl
            control="radio"
            label="Radio"
            name="radioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            label="CheckBox"
            name="checkboxOption"
            options={checkboxOptions}
          />  
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
