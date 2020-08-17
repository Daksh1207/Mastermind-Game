import React from "react";
import styled from "styled-components";

export enum PegType {
  IN_POSITION = "inPosition",
  RIGHT_COLOR = "rightColor",
  EMPTY = "empty",
}

interface PegProps {
  type: PegType;
}

const StyledPeg = styled.div<PegProps>`
  width: ${(props) => props.theme.peg.size};
  height: ${(props) => props.theme.peg.size};
  border: ${(props) => props.theme.peg.border};
  background-color: ${(props) => props.theme.peg.color[props.type]};

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bar = styled.div`
  width: ${(props) => props.theme.peg.size};
  background-color: grey;
  transform: rotateZ(125deg);

  height: 1px;
`;

export const Peg: React.FC<PegProps> = (props) => {
  return (
    <StyledPeg type={props.type}>
      {props.type === PegType.EMPTY && <Bar />}
    </StyledPeg>
  );
};
