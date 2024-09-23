export interface FormInputProps {
  name: string;
  label: string;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string | null;
  resetThis?: boolean;
  length?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

///Radio Props

import { IconType } from "react-icons";

export interface FormRadioOption {
  value: string;
  label: string;
  icon?: IconType;
  iconStyle?: React.CSSProperties;
}
export interface FormRadioProps {
  name: string;
  options: FormRadioOption[];
  className?: string;
  Icon?: IconType;
  label?: string;
  defaultValue?: string;
  hidden?: string; //work on this
}

///Select

export interface OptionType {
  label: string;
  value: string;
  id?: string;
}

export interface SelectInputProps {
  name: string;
  label?: string;
  options: OptionType[];
  defaultValue?: string | string[] | null;
  isMulti?: boolean;
  className?: string;
  onChange?: (selectedOption: OptionType | OptionType[] | null) => void;
}
export interface DatePickerProps {
  name: string;
  className?: string;
  label: string;
  dateFormat?: string;
  defaultValue?: Date | null;
}
