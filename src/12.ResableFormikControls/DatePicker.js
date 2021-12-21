import { ErrorMessage, Field } from "formik";
import React from "react";
import DataView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextError from "./TextError";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <Field name={name}>
        {({ field, form }) => {
          const { setFieldValue } = form; // this method allows you to programatically set a field value in formic state
          const { value } = field; // give the datepicker value
          return (
            <DataView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
           />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default DatePicker;
