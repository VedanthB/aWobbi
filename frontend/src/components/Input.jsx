import React from 'react';

const Input = ({
  id,
  label,
  name,
  errorMessage,
  placeholder,
  value,
  onChange,
  textArea,
}) => {
  if (textArea)
    return (
      <div className="mb-6">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <textarea
          type="text"
          id={id}
          name={name}
          className="border border-purple-500 bg-transparent dark:text-gray-400 text-purple-900  placeholder-purple-700  text-sm rounded-lg focus:outline-purple-400 focus:outline focus:outline-offset-2 block w-full p-2.5"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          cols="30"
          rows="4"
        />
        <p
          className={`mt-2  ${
            errorMessage ? 'opacity-1' : 'opacity-0'
          } text-sm text-red-600 `}
        >
          <span className="font-medium"> {errorMessage} </span>
        </p>
      </div>
    );

  return (
    <div className="mb-6">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        className="border border-purple-500 dark:text-gray-400 text-purple-900  placeholder-purple-700  text-sm rounded-lg bg-transparent focus:outline-purple-400 focus:outline focus:outline-offset-2 block w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <p
        className={`mt-2  ${
          errorMessage ? 'opacity-1' : 'opacity-0'
        } text-sm text-red-600 `}
      >
        <span className="font-medium"> {errorMessage} </span>
      </p>
    </div>
  );
};

export default Input;
