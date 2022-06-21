import { useState } from "react";
import { Formik, Form } from 'formik';

export default function FormikStepper({ children, formik }) {
  const [step, setStep] = useState();

  return (
    <Form 
      className="h-full"
      onSubmit={formik.handleSubmit}
    >
      {children}
    </Form>
  );
}
