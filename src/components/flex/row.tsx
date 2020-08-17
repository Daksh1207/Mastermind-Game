import styled, { css } from "styled-components";

type HAlign = "end" | "center";

type VAlign = "center";

const getHalign = (key: HAlign) => {
  switch (key) {
    case "end":
      return "flex-end";
    default:
      return key;
  }
};

export const Row = styled.div<{ valign?: VAlign; halign?: HAlign }>`
  display: flex;
  flex-direction: row;

  ${(props) =>
    props.valign &&
    css`
      align-items: ${props.valign};
    `}

  ${(props) =>
    props.halign &&
    css`
      justify-content: ${getHalign(props.halign)};
    `}
`;
