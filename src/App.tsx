import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GitHubButton from "react-github-btn";

import { Mastermind } from "./game";
import { Button, Select } from "./components/ui";
import { GlobalStyle, DefaultTheme } from "./themes";
import { Col, Spacer, Row } from "./components/flex";

type Difficulty = "easy" | "pro";

const BOARDS: {
  [key in Difficulty]: { rows: number; cols: number; colors: number };
} = {
  easy: {
    rows: 8,
    cols: 4,
    colors: 6,
  },
  pro: {
    rows: 12,
    cols: 5,
    colors: 8,
  },
};

const StyledWrapper = styled.div`
  background-color: #f4f4f4;
  margin: auto 0;
  min-height: 100%;
`;

const InnerWrapper = styled.div`
  max-width: 440px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.m};
`;

const TextCol = styled(Col)`
  text-align: justify;
  margin-top: ${({ theme }) => theme.spacing.l};
`;

interface AppState {
  difficulty: Difficulty;
  rows: number;
  cols: number;
  colors: number;
}

function App() {
  const [state, setState] = useState<AppState>({
    difficulty: "easy",
    rows: BOARDS["easy"].rows,
    cols: BOARDS["easy"].cols,
    colors: BOARDS["easy"].colors,
  });

  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <StyledWrapper>
        <InnerWrapper>
          <Col>
            <Row valign="center">
              <Spacer margin={{ right: "m" }}>
                <h1>Mastermind</h1>
              </Spacer>
              <GitHubButton
                href="https://github.com/pirobits/mastermind"
                data-size="large"
                data-show-count
                aria-label="Star pirobits/cheatsheets on GitHub"
              >
                Star
              </GitHubButton>
            </Row>
            <Spacer margin={{ bottom: "l" }}>
              <Row valign="center">
                <Select
                  id="difficulty"
                  placeholder="Mode"
                  value={state.difficulty}
                  onChange={(e) => {
                    const difficulty = e.target.value as Difficulty;

                    setState((prevState) => ({
                      ...prevState,
                      difficulty,
                      rows: BOARDS[difficulty].rows,
                      cols: BOARDS[difficulty].cols,
                      colors: BOARDS[difficulty].colors,
                    }));
                  }}
                >
                  <option value="easy">Easy</option>
                  <option value="pro">Pro</option>
                </Select>
                <Spacer margin={{ left: "m" }}>
                  <Button
                    modifier="danger"
                    onClick={() => {
                      window.dispatchEvent(new Event("mastermind.restart"));
                    }}
                  >
                    Restart
                  </Button>
                </Spacer>
              </Row>
            </Spacer>

            <Mastermind
              rows={state.rows}
              cols={state.cols}
              colors={state.colors}
            />

            <TextCol>
              <h2>How to play Mastermind</h2>

              <p>
                The purpose of the game is discovering a secret color
                combination. It is formed by N random colors, and is randomly
                selected on each game. The colors can be repeated.
              </p>
              <p>
                Drag and drop the colors into the active row. When you complete
                a row with all the colors, the <code>Check</code> button will be
                enabled. It will reveal you two a set of pegs:
              </p>
              <ul>
                <li>
                  White: one pin color is in the solution, but it not correctly
                  placed.
                </li>
                <li>
                  Red: one pin color is in the solution, and it is correctly
                  placed.
                </li>
              </ul>
              <p>You can change the game mode (difficulty):</p>
              <ul>
                <li>Easy: 4 pins, 6 colors, 8 rows.</li>
                <li>Pro: 5 pins, 8 colors, 12 rows.</li>
              </ul>
              <p>
                The <code>Reset</code> button starts a new game with a new
                secret combination.
              </p>
            </TextCol>

            <TextCol>
              <Row halign="center">
                <p>Alberto Sola - 2020</p>
              </Row>
            </TextCol>
          </Col>
        </InnerWrapper>
      </StyledWrapper>
    </ThemeProvider>
  );
}

export default App;
