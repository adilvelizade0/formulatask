import styled from "styled-components";

const FormulaStyles = styled.div`
  border: 1px solid #edf0f2;
  border-radius: 0.25rem;
  .formula-header {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    background: rgb(0 17 51 / 0.1);
    .dropdown-icon {
      cursor: pointer;
    }
  }

  .formula-body {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    background-color: rgb(246 248 250 / 1);
    box-shadow: inset 0px -1px 0px #edf0f2;
    font-weight: normal;
    font-size: 14px;

    .ReactCollapse--collapse {
      transition: height 500ms;
    }

    .formula-footer {
      background: #fff;
      border-top: 1px solid #edf0f2;
    }
  }
`;

export default FormulaStyles;
