import { useState } from "react";
import AdminQCheckbox from "./AdminQCheckbox";
import API from "../../../services/api-client";

const AddQuestion = ({
  setCurrentQuestions,
  currentQuestions,
  id,
  allQuestions,
}) => {
  const [selected, setSelected] = useState([]);

  const availQ = allQuestions.filter(
    (question) => !currentQuestions.includes(question._id)
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentQuestions([...currentQuestions, ...selected]);
    API.patchOne("sets", id, { questions: [...currentQuestions, ...selected] });
  };

  const addToSelected = (id) => {
    let selected_copy = selected;
    if (!selected.includes(id)) {
      selected_copy.push(id);
    } else {
      const index = selected_copy.indexOf(id);
      selected_copy.splice(index, 1);
    }
    setSelected(selected_copy);
  };

  return (
    <form className="add-question-form" onSubmit={onSubmit}>
      {availQ.map(
        (question) =>
          !currentQuestions.includes(question) && (
            <AdminQCheckbox
              question={question}
              addToSelected={addToSelected}
              key={question._id}
            />
          )
      )}
      <input className="btn btn-primary" type="submit" value="Confirm" />
    </form>
  );
};

export default AddQuestion;
