import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  background: transparent;
  color: #666;
  padding: 8px 4px 4px 4px;
  font-size: 1.1rem;
  border: 2px solid #888;
  border-radius: 4px;
  min-width: 120px;
  min-height: 40px;

  option {
    color: #666;
    background: transparent;
    border: 1px solid #888;
  }

  :active,
  :focus {
    outline: none;
    border-color: black;
    color: black;
  }
`;

const StyledWrapper = styled.div`
  position: relative;

  label {
    position: absolute;
    background: #f4f4f4;
    left: 6px;
    top: -9px;
    padding: 1px 4px;
  }

  select:active + label,
  select:focus + label {
    color: black;
  }
`;

interface SelectProps<T> {
  id: string;
  placeholder?: string;
  value: T;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  return (
    <StyledWrapper>
      <StyledSelect
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange && props.onChange(e)}
      >
        {props.children}
      </StyledSelect>
      <label htmlFor={props.id}>{props.placeholder}</label>
    </StyledWrapper>
  );
};
