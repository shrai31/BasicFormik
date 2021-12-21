import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import "../App.css";
import TextError from "../2.FormikSchemaValidationWithYup/TextError";

const initialValues = {
  name: "",
  email: "",
  address: "",
  gender: "",
  social: {
    google: "",
    github: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
const onSubmit = (values, onSubmitProps) => {
  console.log("form data", values, onSubmitProps);
  onSubmitProps.setSubmitting(false);
};

const validateSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
});

const validateGender = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

function DisableSubmitButton2() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
        // validateOnMount
      >
        {(formik) => {   // this formik will return all method which is field level in these we control form and fied level functionality.
          console.log("fornik Props", formik);
          return (
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
                  <label htmlFor="gender">Gender</label>
                  <Field
                    type="text"
                    id="gender"
                    name="gender"
                    validate={validateGender}
                  />
                  <ErrorMessage name="gender" component={TextError} />
                </div>
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
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
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
              <button
                type="button"
                onClick={() => formik.validateField("gender")}
              >
                Validate Gender
              </button>
              <button type="button" onClick={() => formik.validateForm('gender')}>
                Validate All
              </button>
              <button
                type="button"
                onClick={() => formik.setFieldTouched("gender")}
              >
                Visit Gender
              </button>
              <button type="button" onClick={() => formik.setTouched({
                  name:true,
                  email:true,
                  address:true,
                  gender:true

              })}>
                Visit All
              </button>
              <button type="submit" disabled={formik.isSubmitting}>Submit</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default DisableSubmitButton2;



// b) Form submission in progress: form is submitting in backgound.
  // eg. userRegistration form: fill detail and click submit then api call in background to register the user
  // during this time it's neccessary to disable the submit button same copy of form takes place
  // eg. Disable submit button till the background operation is completed.

  // isSubmitting=> handler in formik rendering props.
  // initially the isSubmitting is true and after click on submit button the isSubmitting is false.
  // it's happen to fast that we will not see the chnages of the submit button.

  // if there is no error : button is disabled still because this is identant behaviuor, because formik doesn't know when your api is respond back so manully issubmitting has been false
  //using onSubmit props