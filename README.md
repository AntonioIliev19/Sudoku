# 🧩 Angular Sudoku App

An interactive Sudoku game built with **Angular** and **Angular Material**.  
It lets you generate sudoku table, validate your progress, or instantly solve the board.

---

## ✨ Features

- **Generate sudoku table**  
  Choose from three difficulty levels: **Easy**, **Medium**, or **Hard**.

- **Validate progress**
  - **Unsolved** → Your moves so far are valid. Keep going!
  - **Unsolvable** → The board is unsolvable. Undo or change one or more numbers, then try to use solve again.
  - **Broken** → There is a conflict on the board. Undo or change one or more numbers, then validate again.

- **Solve instantly**  
  Fill the table automatically (use if you’re stuck or want to check the solution).

- **Status & Level display**
  - **Status** shows whether the current board is _Unsolved_, _Unsolvable_ or _Broken_.
  - **Level** shows the difficulty of the generated sudoku.

- **Helpful info dialog**  
  A Material Design popup explains how validation works and gives gameplay tips.

---

## 🔗 Credits

This project uses the awesome [**Sugoku API**](https://github.com/bertoort/sugoku) created by [**@bertoort**](https://github.com/bertoort) for generating, validating, and solving Sudoku puzzles.  
Big thanks for making this available to the community! 🙌

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22+ recommended)
- [Angular CLI](https://angular.io/cli)

### Installation

```bash
# Clone the repo
git clone https://github.com/AntonioIliev19/Sudoku.git
cd Sudoku

# Install dependencies
npm install

# Run the app
npm start
```
