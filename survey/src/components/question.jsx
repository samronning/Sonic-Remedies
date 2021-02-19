import "../css/components/question.scss";
import MultipleChoice from "./multipleChoice";
import { useEffect, useState, useRef } from "react";
import { ReactComponent as NextButtonChosen } from "../vectors/arrowDownChosen.svg";
import { ReactComponent as NextButton } from "../vectors/arrowDown.svg";
import { HashLink } from "react-router-hash-link";

function renderNext(ifChosen, pos) {
  const nextPosId = "#question" + (pos + 1);
  return ifChosen ? (
    <HashLink smooth to={nextPosId}>
      <NextButtonChosen className="next-button" />
    </HashLink>
  ) : (
    <NextButton className="next-button" />
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Question({ question, handleResponse, pos }) {
  const { ask, responses } = question;
  const [ifChosen, setIfChosen] = useState(false);
  const ifChosenPrev = usePrevious(ifChosen);

  function handleChosen() {
    setIfChosen(true);
  }

  useEffect(() => {
    if (ifChosen & (ifChosenPrev === false)) handleResponse();
  }, [ifChosen, ifChosenPrev, handleResponse]);
  //Later add logic for if the question.type is not multiple choice
  return (
    <div className="question" id={"question" + pos}>
      <h1>{ask}</h1>
      <MultipleChoice responses={responses} handleChosen={handleChosen} />
      <div className="next">{renderNext(ifChosen, pos)}</div>
    </div>
  );
}

export default Question;
