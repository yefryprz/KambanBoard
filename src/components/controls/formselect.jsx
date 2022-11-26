import { Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";

const FormSelect = (props) => {
  const { options } = props;
  const frmContext = useFormikContext();

  useEffect(() => {
    if (props.defaultValue) {
      frmContext.setFieldValue(props.name, props.defaultValue);
    }
  }, []);

  return (
    <>
      <Field {...props} component="select">
        <option key={0} disabled value="">
          Select
        </option>
        {options.map(({ key, value }, indx) => (
          <option key={indx} value={key}>
            {value}
          </option>
        ))}
      </Field>
      <ErrorMessage
        render={(msg) => <span style={{ color: "red" }}>{msg}</span>}
        name={props.name}
      />
    </>
  );
};

export { FormSelect };
