import React from "react";

interface InputProps {
  name: string;
  labelText?: string;
  placeHolder?: string;
}

// Text Input
export const TextInput: React.FC<InputProps> = ({
  name,
  labelText,
  placeHolder,
}) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
    <input
      type="text"
      id={name}
      name={name}
      placeholder={placeHolder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

// Number Input
export const NumberInput: React.FC<InputProps> = ({
  name,
  labelText,
  placeHolder,
}) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
    <input
      type="number"
      id={name}
      name={name}
      placeholder={placeHolder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

// Date Input
export const DateInput: React.FC<InputProps> = ({
  name,
  labelText,
  placeHolder,
}) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
    <input
      type="date"
      id={name}
      name={name}
      placeholder={placeHolder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>
);

// Checkbox Input
export const CheckboxInput: React.FC<InputProps> = ({ name, labelText }) => (
  <div className="flex items-center space-x-2">
    <input type="checkbox" id={name} name={name} className="checkbox h-4 w-4 text-blue-600 focus:ring focus:ring-blue-200 rounded" />
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
  </div>
);

// Select Input
interface SelectInputProps extends InputProps {
  options: string[];
}
export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  labelText,
  options,
}) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
    <select id={name} name={name} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Radio Input
interface RadioInputProps extends InputProps {
  options: string[];
}
export const RadioInput: React.FC<RadioInputProps> = ({
  name,
  labelText,
  options,
}) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label className="text-sm font-medium">{labelText}</label>}
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option} className="inline-flex items-center space-x-2">
          <input type="radio" name={name} value={option} className="radio text-blue-600 focus:ring focus:ring-blue-200" />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

// Range Input
export const RangeInput: React.FC<InputProps> = ({ name, labelText }) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
    <input type="range" id={name} name={name} className="w-full focus:outline-none focus:ring focus:ring-blue-200" />
  </div>
);

// MultiSelect Input
export const MultiSelectInput: React.FC<SelectInputProps> = ({
  name,
  labelText,
  options,
}) => (
  <div className="flex flex-col space-y-1">
    {labelText && <label htmlFor={name} className="text-sm font-medium">{labelText}</label>}
    <select id={name} name={name} multiple className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
