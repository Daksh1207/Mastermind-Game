import styled from "styled-components";

export const Button = styled.button<{ modifier?: string }>`
  background: transparent;
  color: ${(props) =>
    props.modifier
      ? props.theme.color[props.modifier]
      : props.theme.color.primary};

  appearance: none;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  padding: 8px 16px;
  font-size: 1.1rem;
  font-weight: 700;
  background-color: transparent;
  box-shadow: 0px 0px 0px 2px inset;
  margin: 0;
  text-decoration: none;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 4px;
  min-height: 40px;

  :disabled {
    color: ${(props) => props.theme.color.disabled};
  }
`;
