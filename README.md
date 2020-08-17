# Mastermind

Mastermind game developed for fun, using React + Styled components.

## Local development

```
npm i
npm start
```

## How to play Mastermind

The purpose of the game is discovering a secret color combination. It's formed by N random colors, and is randomly selected on each game. The colors can be repeated.

Drag and drop the colors into the active row. When you complete a row with all the colors, the `Check` button will be enabled. It will reveal you two a set of pegs:

- White: one pin color is in the solution, but it not correctly placed.
- Red: one pin color is in the solution, and it is correctly placed.

You can change the game mode (difficulty):

- Easy: 4 pins, 6 colors, 8 rows.
- Pro: 5 pins, 8 colors, 12 rows.

The `Reset` button starts a new game with a new secret combination.
