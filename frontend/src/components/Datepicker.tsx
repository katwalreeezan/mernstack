import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerProps } from "./utils";

const CustomDatePicker: FC<DatePickerProps> = ({
  name,
  className,
  label,
  dateFormat = "yyyy/MM/dd",
  defaultValue = null,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message as string | undefined;

  // Use the defaultValue or current date if no defaultValue is provided
  const defaultDate = defaultValue || new Date();

  return (
    <div className="pb-2">
      <label htmlFor={name}>{label}</label>
      <div className={className}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultDate}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat}
              isClearable
              placeholderText="Select a date"
            />
          )}
        />
      </div>
      {hasError && errorMessage && (
        <span style={{ color: "red", fontSize: "14px" }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomDatePicker;
