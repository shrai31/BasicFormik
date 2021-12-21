import { Field } from 'formik';
import React from 'react';
import DataView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker(props) {
    const { label, name, ...rest } = props; 
    return (
        <div className='form-control'>
            <Field name= {name}>
                {
                    ({field, form})=>{ 
                        const { setFieldValue } = form; // this method allows you to programatically
                    }
                }
            </Field>
        </div>
    )
}

export default DatePicker
