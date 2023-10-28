import { create } from "zustand";
import { Formula } from "../App.tsx";

export type FormulaBox = {
  total: number;
  formula: Formula | null;
  id: string;
};

const useFormulaBoxStore = create((set) => ({
  formulaBoxes: [
    {
      total: 0,
      formula: null,
      id: "1",
    },
  ],
  addFormulaBox: (formulaBox: FormulaBox) => {
    set((state: { formulaBoxes: FormulaBox[] }) => ({
      formulaBoxes: [...state.formulaBoxes, formulaBox],
    }));
  },
  changeTotalPropById: (id: string, total: number) => {
    set((state: { formulaBoxes: FormulaBox[] }) => ({
      formulaBoxes: state.formulaBoxes.map((formulaBox) => {
        if (formulaBox.id === id) {
          return { ...formulaBox, total };
        }
        return formulaBox;
      }),
    }));
  },
}));

export default useFormulaBoxStore;
