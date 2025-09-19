# 🧩 Angular Sudoku App

An interactive Sudoku game built with **Angular** and **Angular Material**.  
It lets you generate sudoku table, validate your progress, or instantly solve the board.

---

## ✨ Features

- **Generate puzzles**  
  Choose from three difficulty levels: **Easy**, **Medium**, or **Hard**.

- **Validate progress**
  - **Unsolved** → Your moves so far are valid. Keep going!
  - **Unsolvable** → The board is unsolvable. Undo or change one or more numbers, then try to use solve again.
  - **Broken** → There is a conflict on the board. Undo or change one or more numbers, then validate again.

- **Solve instantly**  
  Fill the puzzle automatically (use if you’re stuck or want to check the solution).

- **Status & Level display**
  - **Status** shows whether the current board is *Unsolved*, *Unsolvable* or *Broken*.
  - **Level** shows the difficulty of the generated puzzle.

- **Helpful info dialog**  
  A Material Design popup explains how validation works and gives gameplay tips.

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
