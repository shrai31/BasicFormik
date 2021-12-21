import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import "../App.css";
import TextError from "../2.FormikSchemaValidationWithYup/TextError";

const initialValues = {
  name: "",
  email: "",
  address: "",
  social: {
    google: "",
    github: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
const onSubmit = (values) => {
  console.log("form data", values);
};

const validateSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
});

function ValidationRun() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
        validateOnChange={false}  // this props not run the validat function onChange.
        validateOnBlur={false}  // validation is not run when click on outside.
      >
        <Form>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage name="email">
              {(errormsg) => <div className="error">{errormsg}</div>}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <FastField name="address">
              {(props) => {
                // console.log("Field render");
                const { field, meta } = props;
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </FastField>
            <div className="form-control">
              <label htmlFor="google">Google Profile</label>
              <Field type="text" id="google" name="social.google" />
            </div>
            <div className="form-control">
              <label htmlFor="github">github Profile</label>
              <Field type="text" id="github" name="social.github" />
            </div>
            <div className="form-control">
              <label htmlFor="primaryNo">Primary Phone Number</label>
              <Field type="text" id="primaryNo" name="phoneNumbers[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="secondryNo">Secondry Phone Number </label>
              <Field type="text" id="secondryNo" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of Phone number</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, form, remove } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        // {console.log("phNumber",phNumber)}
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}

                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
}

export default ValidationRun;

