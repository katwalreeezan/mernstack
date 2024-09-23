import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { OptionType, SelectInputProps } from './utils';
import { get } from 'lodash';

const SelectInput: FC<SelectInputProps> = ({
	name,
	label,
	options,
	defaultValue,
	isMulti,
	className,
	onChange,
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const hasError = !!get(errors, name);
	const errorMessage = get(errors, `${name}.message`) as string | undefined;

	let defaultSelectedOptions: string[] | OptionType | OptionType[] | null =
		null;

	// Provide a fallback value if defaultValue is undefined
	const safeDefaultValue = defaultValue ?? [];

	if (isMulti) {
		// Transforming safeDefaultValue into { value, label } format
		defaultSelectedOptions = Array.isArray(safeDefaultValue)
			? safeDefaultValue.map((item) => ({
					// @ts-expect-error Third-party library with type issues
					value: item.id,
					// @ts-expect-error Third-party library with type issues
					label: item.name,
				}))
			: [];
	} else {
		defaultSelectedOptions =
			options?.find((option) => option.label === safeDefaultValue) ?? null;
	}

	return (
		<div>
			<label htmlFor={name} className="mb-2">
				{label}
			</label>
			<Controller
				control={control}
				name={name}
				defaultValue={defaultSelectedOptions}
				render={({ field: { value, onChange: fieldOnChange } }) => (
					<Select
						value={value}
						isMulti={isMulti}
						options={options}
						className={className}
						styles={{
							control: (baseStyles) => ({
								...baseStyles,
							}),
							option: (provided, state) => ({
								...provided,
								color: state.isSelected ? 'white' : 'black',
								backgroundColor: state.isSelected ? 'grey' : 'white',
								':hover': {
									backgroundColor: 'grey',
									cursor: 'pointer',
								},
							}),
						}}
						onChange={(selectedOption) => {
							fieldOnChange(selectedOption);
							if (onChange) {
								onChange(selectedOption);
							}
						}}
					/>
				)}
			/>
			{hasError && errorMessage && (
				<span style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</span>
			)}
		</div>
	);
};

export default SelectInput;
