import { runner, Point } from "./algo";

describe("runner", () => {
  test("finds the correct path in a small grid", () => {
    const gridList = [".X.", ".X.", "..."];
    const start: Point = { x: 0, y: 0 };
    const end: Point = { x: 0, y: 2 };
    const result = runner(gridList, start, end);
    expect(result).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ]);
  });

  test("finds the correct path in a larger grid", () => {
    const gridList = [
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
    ];
    const start: Point = { x: 0, y: 0 };
    const end: Point = { x: 9, y: 9 };
    const result = runner(gridList, start, end);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toEqual(10);
  });

  test("returns an empty array if no path is found", () => {
    const gridList = ["XXXXX", "X...X", "XXXXX", "X...X", "XXXXX"];
    const start: Point = { x: 1, y: 1 };
    const end: Point = { x: 3, y: 3 };
    const result = runner(gridList, start, end);
    expect(result).toEqual([]);
  });
});
