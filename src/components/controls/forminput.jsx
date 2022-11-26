import { useEffect } from "react";
import { Field, useFormikContext, ErrorMessage } from "formik";

const FormInput = (props) => {
  const frmContext = useFormikContext();

  useEffect(() => {
    if (props.defaultValue) {
      frmContext.setFieldValue(props.name, props.defaultValue);
    }
  }, []);

  return (
    <>
      <Field {...props} />
      <ErrorMessage
        render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
        name={props.name}
      />
    </>
  );
};

export { FormInput };
