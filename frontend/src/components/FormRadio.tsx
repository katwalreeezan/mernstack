import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormRadioProps } from "./utils";

const FormRadio: FC<FormRadioProps> = ({
  name,
  options,
  className,
  Icon,
  label,
  defaultValue,
  hidden,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message as string | undefined;
  const isValidIcon = Icon && typeof Icon === "function";

  return (
    <div>
        <div>
          <label htmlFor="">{label}</label>
        </div>

      <div className={`d-flex align-items-end ${className}`}>
        {options.map((option, index) => (
          <div key={index} className="me-4">
            <Controller
              control={control}
              name={name}
              defaultValue={defaultValue} // Set the default value here
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="radio"
                    value={option.value}
                    id={`${name}-${option.value}`}
                    defaultChecked={option.value === defaultValue} // Check if the option value matches the default value
                  />
                  <label htmlFor={`${name}-${option.value}`}>
                    {option.icon && isValidIcon && (
                      <Icon style={option.iconStyle} className="me-2 mb-1" />
                    )}
                    {option.label}
                  </label>
                </>
              )}
            />
          </div>
        ))}
      </div>
      {hasError && errorMessage && (
        <span style={{ color: "red", fontSize: "14px" }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormRadio;
