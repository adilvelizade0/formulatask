import { JSX } from "react";
import FormulaBox from "./components/FormulaBox/FormulaBox.component.tsx";
import { create } from "zustand";

export type Formula = {
  name: string;
  category: string;
  value: number | string;
  id: string;
  isShow?: boolean;
};

export const useFormulasStore = create(() => ({
  formulas: [
    {
      name: "/",
      category: "operators",
      value: "/",
      id: "31",
    },
    {
      name: "*",
      category: "operators",
      value: "*",
      id: "32",
    },
    {
      name: "+",
      category: "operators",
      value: "+",
      id: "33",
    },
    {
      name: "-",
      category: "operators",
      value: "-",
      id: "34",
    },
    {
      name: "^",
      category: "operators",
      value: "^",
      id: "35",
    },
    {
      name: "(",
      category: "operators",
      value: "(",
      id: "36",
    },
    {
      name: ")",
      category: "operators",
      value: ")",
      id: "37",
    },
  ],
}));

function App(): JSX.Element {
  return (
    <>
      <FormulaBox />
    </>
  );
}

export default App;
