import { FC, JSX, useEffect, useState } from "react";
import FormulaInputStyles from "./FormulaInput.styles.ts";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { type Formula } from "../../App.tsx";
import { useQuery } from "react-query";
import useFormulaBoxStore, {
  type FormulaBox,
} from "../../zustand/formulas.state.ts";
import { evaluate } from "mathjs";

const operators = [
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
];

const template = (
  item: Formula,
  toggleShowProperty: (id: string) => void,
  changeValue: (id: string, value: string) => void,
) => {
  return (
    <div className="d-flex align-items-center">
      <div className="pe-2">{item.name}</div>
      {item.category === "operators" ? (
        <> </>
      ) : (
        <div>
          {item.isShow ? (
            <input
              autoFocus={true}
              style={{
                width: "30px",
              }}
              value={item.value}
              onChange={(e) => {
                changeValue(item.id, e.target.value);
              }}
              onBlur={() => {
                toggleShowProperty(item.id);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  toggleShowProperty(item.id);
                }
              }}
            />
          ) : (
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                toggleShowProperty(item.id);
              }}
            >
              [{item.value}]
            </button>
          )}
        </div>
      )}
    </div>
  );
};

type FormulaInput = {
  formulaData: FormulaBox;
};

const FormulaInput: FC<FormulaInput> = ({ formulaData }): JSX.Element => {
  const changeTotalPropById = useFormulaBoxStore(
    // @ts-ignore
    (state) => state.changeTotalPropById,
  );

  const [formules, setFormules] = useState<Formula[]>([]);
  const [selectedFormules, setSelectedFormules] = useState<Formula[]>([]);
  const [filteredFormules, setFilteredFormules] = useState<Formula[]>([]);
  const { data } = useQuery("formulas", () =>
    fetch("https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete").then(
      (res) => res.json(),
    ),
  );

  const search = (event: AutoCompleteCompleteEvent) => {
    let filteredFormules: Formula[];

    if (!event.query.trim().length) {
      filteredFormules = [...formules];
    } else {
      filteredFormules = formules.filter((formula) => {
        return formula.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredFormules(filteredFormules);
  };
  useEffect(() => {
    if (data) {
      // create new array and assign data and operators, then add each object which has name and value {isShow} to the array
      const newFormules = [...data, ...operators].map((item) => {
        return {
          ...item,
          isShow: false,
        };
      });

      setFormules(newFormules);
    }
  }, [data]);

  const toggleShowProperty = (id: string) => {
    const newFormules = selectedFormules.map((item) => {
      if (item.id === id) {
        item.isShow = !item.isShow;
      }
      return item;
    });

    setSelectedFormules(newFormules);
  };

  const changeValue = (id: string, value: string) => {
    const newFormules = selectedFormules.map((item) => {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });

    setSelectedFormules(newFormules);
    calcualteSelectedFormules();
  };

  const calcualteSelectedFormules = () => {
    if (selectedFormules.length === 0) {
      changeTotalPropById(formulaData.id, 0);
    } else {
      const selectedFormulesValues = selectedFormules.map((item) => item.value);
      const selectedFormulesString = selectedFormulesValues.join("");

      let total = 0;
      try {
        total = evaluate(selectedFormulesString);
      } catch (error) {
        return;
      }

      changeTotalPropById(formulaData.id, total);
    }
  };

  useEffect(() => {
    calcualteSelectedFormules();
  }, [selectedFormules]);

  return (
    <FormulaInputStyles>
      <AutoComplete
        field="name"
        multiple
        value={selectedFormules}
        suggestions={filteredFormules}
        completeMethod={(e) => {
          search(e);
        }}
        onChange={(e) => {
          setSelectedFormules(e.value);
        }}
        style={{
          width: "100%",
        }}
        selectedItemTemplate={(i) =>
          template(i, toggleShowProperty, changeValue)
        }
      />
    </FormulaInputStyles>
  );
};

export default FormulaInput;
