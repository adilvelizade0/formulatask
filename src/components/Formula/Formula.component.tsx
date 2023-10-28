import { JSX, FC, useState } from "react";
import FormulaStyles from "./Formula.styles.ts";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { BsFillInfoCircleFill, BsThreeDots } from "react-icons/bs";
import { Collapse } from "react-collapse";
import FormulaInput from "../FormulaInput/FormulaInput.component.tsx";
import { type FormulaBox } from "../../zustand/formulas.state.ts";

type Formula = {
  formula: FormulaBox;
};

const Formula: FC<Formula> = ({ formula }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [formulaName, setFormulaName] = useState<string>(
    "New Formula" + formula.id,
  );

  return (
    <FormulaStyles className="mb-3">
      <div className="formula-header p-2 d-flex align-items-center justify-content-between">
        <div>
          {isOpen ? (
            <IoMdArrowDropdown
              size={18}
              className="me-2 dropdown-icon"
              onClick={toggle}
            />
          ) : (
            <IoMdArrowDropright
              size={18}
              className="me-2 dropdown-icon"
              onClick={toggle}
            />
          )}
          {isShow ? (
            <input
              value={formulaName}
              onInput={(e) => {
                setFormulaName(e.currentTarget.value);
              }}
              onBlur={() => {
                setIsShow(false);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setIsShow(false);
                }
              }}
            />
          ) : (
            <span
              onClick={() => {
                setIsShow(true);
              }}
              style={{
                fontSize: "0.8rem",
              }}
              className="fw-bold"
            >
              {formulaName}
            </span>
          )}
        </div>

        <div className="d-flex align-items-center">
          <BsFillInfoCircleFill size={18} className="me-2" />
          <BsThreeDots size={18} />
        </div>
      </div>
      <div className="formula-body">
        <div className="py-2 px-3">
          <h3>{formula.total}</h3>
        </div>
        <Collapse isOpened={isOpen}>
          <div className="formula-footer py-2 px-3 ">
            <FormulaInput formulaData={formula} />
          </div>
        </Collapse>
      </div>
    </FormulaStyles>
  );
};

export default Formula;
