import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./utils";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { get } from "lodash";

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  readOnly,
  placeholder,
  className,
  defaultValue = "",
  resetThis = false,
  length,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const {
    control,
    formState: { errors },
    reset,
  } = useFormContext();

  const hasError = !!get(errors, name);

  const errorMessage = get(errors, `${name}.message`) as string | undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (length) {
      const numericValue = e.target.value.replace(/\D/g, "");
      e.target.value = numericValue;
    }
  };

  useEffect(() => {
    if (!defaultValue && resetThis) {
      reset({ [name]: "" }); // Use computed property name
    }
  }, [resetThis, name, reset, defaultValue]);

  return (
    <div className="pb-2">
      <label htmlFor={name}>{label}</label>

      <div style={{ position: "relative" }}>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : type}
              readOnly={readOnly}
              placeholder={placeholder}
              className={className}
              maxLength={length ? parseInt(length) : undefined}
              onInput={handleInputChange}
              value={field.value ?? ""}
            />
          )}
        />
        {type === "password" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>
      {hasError && errorMessage && (
        <span style={{ color: "red", fontSize: "14px" }}>{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
