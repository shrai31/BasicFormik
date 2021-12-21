import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function CheckboxButton(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          console.log(field); // this contain the name option in input box also control onchange and onblur method
          return options.map((option) => {
            console.log("options", options);
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)} // basically we checked if the value for the checkbox is present in the
                  // array of values for this entire field. If present checked is true
                  />
                  {/* {console.log("field.value.includes(option.value)",field.value.includes(option.value))} */}
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default CheckboxButton;
