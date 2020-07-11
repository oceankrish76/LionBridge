import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';

const MyInput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
};
const MyOutput = ({ field, form, ...props }) => {
    return <input {...field} {...props} />;
};


const Example = () => (
    <div>
        <h1>My Form</h1>

        <Formik
            initialValues={{ email: '', color: 'red', firstName: '', lastName: '' }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >

            {(props: FormikProps<any>) => (
                <Form>
                    <Field name="lastName">
                        {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                        }) => (
                                <div>
                                    <input type="text" placeholder="Email" {...field} />
                                    {meta.touched && meta.error && (
                                        <div className="error">{meta.error}</div>
                                    )}
                                </div>
                            )}
                    </Field>
                    <Field name="lastName" placeholder="Doe" component={MyInput} />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);
export default Example;