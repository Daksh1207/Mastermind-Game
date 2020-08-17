import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

export type PinColor = string;
export const PIN_COLORS: PinColor[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const PIN_EMPTY_COLOR = "EMPTY";

interface PinProps {
  id: number;
  color: string;
  onColorChange?: (id: number, color: string) => void;
  disabled?: boolean;
}

export const StyledPin = styled.div<{ color: string }>`
  width: ${(props) => props.theme.pin.size};
  height: ${(props) => props.theme.pin.size};
  border: ${(props) => props.theme.pin.border};
  border-radius: 50%;

  background-color: ${(props) => props.theme.pin.color[props.color]};
`;

const StyledDrop = styled.div`
  width: 100%;
  height: 100%;
`;

export const Pin = (props: PinProps) => {
  const [, dragRef] = useDrag({
    item: { type: "pin", color: props.color },
    canDrag: props.color !== PIN_EMPTY_COLOR,
  });

  const onDropColor = (color: string) => {
    !props.disabled &&
      props.onColorChange &&
      props.onColorChange(props.id, color);
  };

  const [, dropRef] = useDrop<{ type: string; color: string }, any, any>({
    accept: "pin",
    drop: (i) => onDropColor(i.color),
  });

  return (
    <StyledPin ref={dragRef} color={props.color}>
      <StyledDrop ref={dropRef} />
    </StyledPin>
  );
};
