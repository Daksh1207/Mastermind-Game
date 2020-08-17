import React, { useState, useEffect, useCallback, useRef } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import styled, { css } from "styled-components";

import { Pin, PIN_COLORS } from "./pin";
import { PinRow } from "./pin-row";
import { Game } from "./game.interface";
import { numberGenerator } from "./number-generator";
import { Col, Spacer } from "../components/flex";
import { DndPreview } from "./dnd-preview";

interface BoardProps {
  rows: number;
  cols: number;
  colors: number;
}

interface BoardState {
  game: Game;
  sticky: boolean;
}

const Grid = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: 80px auto;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 55px ${({ cols }) => `${cols * 55}px`};
  }
`;

const StyledCol = styled(Col)<{ sticky: boolean }>`
  ${(props) =>
    props.sticky &&
    css`
      position: fixed;
      top: 0;
    `}
`;

export const Board = (props: BoardProps) => {
  const initialState = useCallback((): BoardState => {
    const solution: Array<string> = [];
    const validColors = PIN_COLORS.slice(0, props.colors);

    for (let i = 0; i < props.cols; i++) {
      solution.push(
        validColors[Math.floor(Math.random() * validColors.length)]
      );
    }

    return {
      game: {
        activeRow: 0,
        solution,
        cols: props.cols,
        rows: props.rows,
        solved: false,
      },
      sticky: false,
    };
  }, [props.cols, props.rows, props.colors]);

  useEffect(() => {
    window.addEventListener("mastermind.restart", () => {
      setState(initialState());
    });
  }, [initialState]);

  const offset = useRef(9999);

  useEffect(() => {
    setState(initialState());
  }, [initialState]);

  const [state, setState] = useState<BoardState>(initialState());

  useEffect(() => {
    const colors = document.getElementById("color-palette");
    offset.current = colors!.offsetTop;
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      const sticky = window.pageYOffset > offset.current;

      if (sticky !== state.sticky) {
        setState((prevState) => ({
          ...prevState,
          sticky,
        }));
      }
    };
  }, [state.sticky]);

  const onCheck = (colors: Array<string>) => {
    let solved = true;
    for (let i = 0; i < state.game.cols && solved; i++) {
      if (colors[i] !== state.game.solution[i]) {
        solved = false;
      }
    }

    setState((prevState) => ({
      ...prevState,
      game: {
        ...prevState.game,
        activeRow: prevState.game.activeRow + 1,
        solved,
      },
    }));
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <DndPreview />
      <Grid cols={state.game.cols}>
        <div>
          <StyledCol id="color-palette" sticky={state.sticky}>
            <Spacer margin={{ right: "m", top: "s" }}>
              {PIN_COLORS.slice(0, props.colors).map((c, i) => (
                <Spacer margin={{ bottom: "s" }} key={i}>
                  <Pin id={i} color={c} />
                </Spacer>
              ))}
            </Spacer>
          </StyledCol>
        </div>
        <Col>
          {numberGenerator(props.rows).map((rowId) => (
            <Spacer margin={{ bottom: "xs" }} key={rowId}>
              <PinRow
                key={rowId}
                id={rowId}
                game={state.game}
                onCheck={(colors) => onCheck(colors)}
              />
            </Spacer>
          ))}

          <p>Solution</p>
          <PinRow
            id={-1}
            game={state.game}
            colors={
              state.game.solved || state.game.activeRow === state.game.rows
                ? state.game.solution
                : undefined
            }
          />
        </Col>
      </Grid>
    </DndProvider>
  );
};
