import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../../components/Input";
import FormRadio from "../../components/FormRadio";
import SelectInput from "../../components/SelectInput";
import CustomDatePicker from "../../components/Datepicker";
import { useAddStudentMutation } from "../../service/api/apiRequest";
import { schema } from "../../utils/schema";
import { options } from "../../utils/countryOptions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import handleErrors from "../../utils/handleerrors";

type FormFields = Yup.InferType<typeof schema>;
type ErrorResponse = {
  error: {
    status: number;
    data: {
      message: string;
      errors?: { [key: string]: string | string[] };
    };
  };
};

const StudentForm = () => {
  const navigate = useNavigate();
  const [addStudent, { isLoading }] = useAddStudentMutation();
  // Initialize the form methods using react-hook-form
  const methods = useForm<FormFields>({});
  const { reset } = methods;
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // Extract the value of the country
    const formattedData = {
      ...data,
      country: data?.country?.value,
    };

    try {
      const response = await addStudent(formattedData);
      if ("data" in response) {
        if (response.data.code === 201) {
          toast.success(response.data.message);
          navigate("/");
        } else {
          handleErrors(response.data.data as ErrorResponse, methods.setError);
        }
      } else {
        handleErrors(response as ErrorResponse, methods.setError);
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Input field */}
          <FormInput
            name="firstname"
            label="Last Name"
            className="input-field mb-2 pb-1"
          />
          <FormInput
            name="lastname"
            label="Last Name"
            className="input-field mb-2 pb-1"
          />

          {/* Radio Field */}
          <FormRadio
            name="gender"
            hidden="true"
            options={[
              { value: "male", label: "Male" },
              {
                value: "female",
                label: "Female",
              },
            ]}
          />
          <SelectInput
            options={options}
            label="Select Country"
            name="country"
            className="mb-3"
          />
          <CustomDatePicker name="dob" label="DOB" />

          <button type="submit" className="btn btn-primary">
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default StudentForm;
