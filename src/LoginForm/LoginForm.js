import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../12.ResableFormikControls/FormikControl";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("required"),
  });

  const onSubmit = (values) => {
    console.log("form data", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
         return <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
            // autoComplete="off" 
          />
          <FormikControl
            control="input"
            type="password"
            label="Password"
            name="password"
            // autoComplete="off" 
          />
          <button type="submit" disabled={!formik.isValid} >
            Submit
          </button>
        </Form>
}}
    </Formik>
  );
}

export default LoginForm;
