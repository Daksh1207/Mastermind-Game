import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { Pin, PIN_EMPTY_COLOR } from "./pin";
import { Game } from "./game.interface";
import { numberGenerator } from "./number-generator";
import { Peg, PegType } from "./peg";
import { Button } from "../components/ui";
import { Spacer, Row } from "../components/flex";

interface PinRowProps {
  id: number;
  game: Game;
  colors?: Array<string>;
  onCheck?: (colors: Array<string>) => void;
}

const StyledWrapper = styled(Row)<{ active: boolean }>`
  padding: 0 8px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    > *:first-child {
      margin-bottom: ${(props) => props.theme.spacing.xs};
    }
  }

  ${({ active, theme }) =>
    active &&
    `
    padding: 8px;
    border: 1px solid #CCC;
    borderRadius: ${theme.common.borderRadius};
  `}
`;

export const PinRow = (props: PinRowProps) => {
  const initialState = useCallback(() => {
    let colors = [];

    if (props.colors) {
      colors = [...props.colors];
    } else {
      for (let i = 0; i < props.game.cols; i++) {
        colors.push(PIN_EMPTY_COLOR);
      }
    }

    return { colors, pins: { inPosition: 0, rightColors: 0 } };
  }, [props.colors, props.game.cols]);

  const [state, setState] = useState(initialState());

  useEffect(() => {
    setState(initialState());
  }, [initialState, props.game.solution]);

  const onCheck = () => {
    const inPosition = props.game.solution
      .map((c, i) => [c, state.colors[i]])
      .map((c) => c[0] === c[1])
      .filter((c) => c).length;
    const tmpSolutionColors = [...props.game.solution];
    const rightColors =
      state.colors
        .map((c) => {
          const index = tmpSolutionColors.findIndex((sc) => sc === c);
          if (index > -1) {
            tmpSolutionColors.splice(index, 1);
          }

          return index;
        })
        .filter((i) => i > -1).length - inPosition;

    setState((prevState) => ({
      ...prevState,
      pins: { inPosition, rightColors },
    }));

    props.onCheck && props.onCheck(state.colors);
  };

  const isRowActive = props.id === props.game.activeRow && !props.game.solved;

  return (
    <StyledWrapper active={isRowActive}>
      <Row>
        {state.colors.map((c, i) => (
          <Spacer margin={{ right: "xs" }} key={i}>
            <Pin
              id={i}
              color={c}
              disabled={!isRowActive}
              onColorChange={(id, color) =>
                setState((prevState) => {
                  const colors = [...prevState.colors];
                  colors.splice(id, 1, color);

                  return {
                    ...prevState,
                    colors,
                  };
                })
              }
            />
          </Spacer>
        ))}
      </Row>
      {props.onCheck && (
        <Row halign="end">
          {isRowActive ? (
            <Row valign="center">
              <Spacer margin={{ left: "s" }}>
                <Button
                  modifier="accept"
                  disabled={state.colors.some((c) => c === PIN_EMPTY_COLOR)}
                  onClick={() => onCheck()}
                >
                  Check
                </Button>
              </Spacer>
            </Row>
          ) : (
            <Row valign="center">
              {numberGenerator(state.pins.rightColors).map((i) => (
                <Spacer margin={{ right: "xxs" }} key={i}>
                  <Peg type={PegType.RIGHT_COLOR} />
                </Spacer>
              ))}
              {numberGenerator(state.pins.inPosition).map((i) => (
                <Spacer margin={{ right: "xxs" }} key={i}>
                  <Peg key={i} type={PegType.IN_POSITION} />
                </Spacer>
              ))}
              {numberGenerator(
                props.game.cols - state.pins.inPosition - state.pins.rightColors
              ).map((i) => (
                <Spacer margin={{ right: "xxs" }} key={i}>
                  <Peg type={PegType.EMPTY} />
                </Spacer>
              ))}
            </Row>
          )}
        </Row>
      )}
    </StyledWrapper>
  );
};
