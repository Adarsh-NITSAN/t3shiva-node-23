"use client";

import React from "react";
import Select from "react-select";
import theme from "../../utils/theme";

const defaultOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const getCustomStyles = (theme, accentColor, bg, border, indicator) => {
  return {
    dropdownIndicator: () => {
      return {
        display: !indicator && "none",
      };
    },
    indicatorSeparator: () => {},
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? theme.colors[accentColor] : theme.colors.dark,
        textAlign: "left",
        backgroundColor: bg,
      };
    },
    control: (provided, state) => {
      return {
        ...provided,
        border: !border
          ? "none"
          : state.menuIsOpen || state.isFocused
          ? `1px solid ${theme.colors[accentColor]} !important`
          : `1px solid ${theme.colors.border} !important`,
        borderRadius: 10,
        padding: "0.25rem 1rem",
        height: "50px",
        outline: "none",
        boxShadow: "none",
        textAlign: "left",
        backgroundColor: bg,
      };
    },
  };
};
const SelectStyled = ({
  bg = "#fff",
  border = true,
  accentColor = "primary",
  name = "item",
  indicator = true,
  options = defaultOptions,
  instanceId = "sel234",
  ...rest
}) => {
  return (
    <>
      <label
        htmlFor={`react-select-${instanceId}-input`}
        className="sr-only"
      ></label>
      <Select
        styles={getCustomStyles(theme, accentColor, bg, border, indicator)}
        defaultValue={options[0]}
        name={name}
        classNamePrefix="custom-select"
        id={name}
        options={options}
        aria-required="true"
        instanceId={instanceId}
        {...rest}
      />
    </>
  );
};

export default SelectStyled;
