import * as Yup from "yup";

export const schema = Yup.object().shape({
  firstname: Yup.string().label("Firstname").required("Firstname is required."),
  lastname: Yup.string().label("Lastname").required("Lastname is required."),
  gender: Yup.string().label("Gender").required("Gender is required"),
  country: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required("Country is required."),
  }),
});
