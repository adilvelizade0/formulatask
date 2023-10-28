import { FC, JSX } from "react";
import FormulaBoxStyles from "./FormulaBox.styles.ts";
import { Plus } from "iconoir-react";
import Formula from "../Formula/Formula.component.tsx";

const FormulaBox: FC = (): JSX.Element => {
  return (
    <FormulaBoxStyles className="p-5">
      <div className="section-header d-flex justify-content-between align-items-center p-3">
        <div className="formula-counter">Formulas (16)</div>
        <div className="formula-add">
          <button className="btn btn-primary p-0">
            <Plus />
          </button>
        </div>
      </div>
      <div className="section-body p-3">
        <Formula />
      </div>
    </FormulaBoxStyles>
  );
};

export default FormulaBox;
