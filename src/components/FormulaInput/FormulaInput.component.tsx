import { FC, JSX, useState, useRef, useCallback } from "react";
import FormulaInputStyles from "./FormulaInput.styles.ts";
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-indigo/theme.css";

type Tag = {
  id: number;
  name: string;
};

const FormulaInput: FC = (): JSX.Element => {
  return <FormulaInputStyles></FormulaInputStyles>;
};

export default FormulaInput;
