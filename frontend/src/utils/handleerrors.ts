import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { toast } from "react-toastify";
type ErrorResponse = {
  error: {
    status: number;
    data: {
      message: string;
      errors?: { [key: string]: string | string[] };
    };
  };
};

const setErrorWrapper = <FormFields extends FieldValues>(
  setError: UseFormSetError<FormFields>,
  key: Path<FormFields>,
  errorObj: { type: "manual"; message: string }
) => {
  setError(key, { type: errorObj.type, message: errorObj.message });
};

const handleErrors = <FormFields extends FieldValues>(
  response: ErrorResponse,
  setError: UseFormSetError<FormFields>
) => {
  if (response?.error?.status === 400) {
    const transformedErrors = response.error.data.errors || {};

    for (const [key, values] of Object.entries(transformedErrors)) {
      console.log(transformedErrors, "dsdsd");
      if (Array.isArray(values)) {
        values.forEach((value: string) => {
          setErrorWrapper(setError, key as Path<FormFields>, {
            type: "manual",
            message: value,
          });
        });
      } else {
        setErrorWrapper(setError, key as Path<FormFields>, {
          type: "manual",
          message: values as string,
        });
      }
    }
  } else {
    toast.error(response?.error?.data?.message);
  }
};

export default handleErrors;
