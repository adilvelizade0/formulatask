import { FC, JSX } from "react";
import FormulaBoxStyles from "./FormulaBox.styles.ts";
import { Plus } from "iconoir-react";
import Formula from "../Formula/Formula.component.tsx";
import useFormulaBoxStore, {
  type FormulaBox,
} from "../../zustand/formulas.state.ts";

const FormulaBox: FC = (): JSX.Element => {
  const formulas: FormulaBox[] = useFormulaBoxStore(
    // @ts-ignore
    (state) => state.formulaBoxes,
  );
  console.log(formulas);
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
        {formulas.map((formula: FormulaBox) => {
          return <Formula key={formula.id} formula={formula} />;
        })}
      </div>
    </FormulaBoxStyles>
  );
};

export default FormulaBox;
