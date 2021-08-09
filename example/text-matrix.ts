import { Colors } from "../src/index.js";

class TMatrix {
  rows: number = 0;
  cols: number = 0;
  data: (string | Colors)[] = [];
  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(rows * cols);
  }

  set(row: number, col: number, value: string | Colors) {
    this.data[row * this.cols + col] = value;
  }

  get(row: number, col: number) {
    return this.data[row * this.cols + col];
  }

  setRow(row: number, values: any[]) {
    for (let i = 0; i < this.cols; i++) {
      this.set(row, i, values[i]);
    }
  }

  setCol(col: number, values: any[]) {
    for (let i = 0; i < this.rows; i++) {
      this.set(i, col, values[i]);
    }
  }

  fillWithChar(char: string) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.set(i, j, char);
      }
    }
  }
  toString() {
    let s = "";
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        s += this.get(i, j) + " ";
      }
      s += "\n";
    }
    return s;
  }

  toColorObjects() {
    const s: any[] = [];
    for (let i = 0; i < this.rows; i++) {
      s.push("\n");
      for (let j = 0; j < this.cols; j++) {
        s.push(this.get(i, j));
      }
    }
    return s;
  }
}

export default TMatrix;
