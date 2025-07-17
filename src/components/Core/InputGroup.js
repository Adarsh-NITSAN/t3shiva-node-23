"use client";

import { useRef, useState, useEffect } from "react";
import {
  validateEmail,
  validateText,
  validateNumber,
} from "../../utils/validation";

const InputGroup = ({
  label,
  placeholder,
  name,
  type,
  handleChange,
  value,
  handleBlur,
  error,
  textarea,
  isFocused = false,
  defaultValue,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <div className="form-group mb-7">
        {label ? (
          <label
            htmlFor={`${name}`}
            className="heading-text-11 fw-bold form-label"
          >
            {label}
          </label>
        ) : (
          <label className="sr-only"></label>
        )}
        {textarea ? (
          <textarea
            className="form-control heading-text-11 border custom-text-area"
            type={`${type}`}
            id={`${name}`}
            name={`${name}`}
            placeholder={`${placeholder ? placeholder : ""}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            aria-required="true"
          />
        ) : (
          <input
            ref={inputRef}
            className="form-control heading-text-11 border"
            type={`${type}`}
            id={`${name}`}
            name={`${name}`}
            placeholder={`${placeholder ? placeholder : ""}`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            aria-required="true"
            defaultValue={defaultValue}
          />
        )}
        {error && <div className="error-box">{error}</div>}
      </div>
    </>
  );
};


export default InputGroup;
