import { useState, useEffect } from "react";

import AdminQuestion from "./AdminQuestion";
import AddQuestion from "./AddQuestion";
import ChangeOrder from "./ChangeOrder";
import API from "../../services/api-client";
import Button from "react-bootstrap/Button";

import "../../css/components/admin/adminSet.css";

const AdminSet = ({ set, onDelete, onDuplicate }) => {
  const [currentSet, setCurrentSet] = useState(set);
  const [questions, setQuestions] = useState([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showQuestionOrder, setShowQuestionOrder] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchQuestions = async () => {
      const data = await API.getAll("questions");
      const filtered = data.filter((question) =>
        currentSet.questions.includes(question._id)
      );
      const sorted = [];
      for (let i = 0; i < currentSet.questions.length; i++) {
        for (let j = 0; j < filtered.length; j++) {
          if (currentSet.questions[i] === filtered[j]._id) {
            sorted.push(filtered[j]);
            break;
          }
        }
      }
      setQuestions(sorted);
    };
    if (mounted) {
      fetchQuestions();
    }
    return () => (mounted = false);
  }, [currentSet.questions]);

  const deleteQuestion = async (question_id) => {
    const data = await API.getOne("sets", set._id);
    const new_questions = data.questions.filter(
      (question) => question !== question_id
    );
    const updatedSet = {
      ...data,
      questions: new_questions,
    };
    const updated = await API.putOne("sets", set._id, updatedSet);
    setCurrentSet(updated);
  };

  const displayQuestions = () => {
    setShowAddQuestion(!showAddQuestion);
  };

  const displayChangeOrder = () => {
    setShowQuestionOrder(!showQuestionOrder);
  };

  const onAddQuestions = async (selected) => {
    const data = await API.getOne("sets", set._id);
    let set_questions = data.questions;

    for (let i = 0; i < selected.length; i++) {
      set_questions.push(selected[i]);
    }
    const updated_data = await API.putOne("sets", set._id, {
      ...data,
      questions: set_questions,
    });

    setCurrentSet(updated_data);
    setShowAddQuestion(!showAddQuestion);
  };

  const onChangeOrder = async (quest) => {
    setShowQuestionOrder(false);
    const qids = quest.map((q) => q._id);

    const updatedSet = {
      _id: currentSet._id,
      questions: qids,
    };

    const data = await API.patchOne("sets", currentSet._id, updatedSet);
    setCurrentSet(data);
  };

  return (
    <div className="admin-set">
      <h1 className="set-title">
        <b>{set.title}</b>
      </h1>
      {currentSet.music && (
        <h3>
          <i>Set will contain music</i>
        </h3>
      )}
      <Button onClick={() => onDelete(set._id)}>Delete Set</Button>
      <Button onClick={() => onDuplicate(currentSet)}>Duplicate Set</Button>
      <Button onClick={() => displayChangeOrder()}>
        Change Question Order
      </Button>
      {showQuestionOrder && (
        <ChangeOrder curquestions={questions} onChangeOrder={onChangeOrder} />
      )}
      <div className="set-questions">
        <ol>
          {questions.map((question) => (
            <li key={question._id}>
              <AdminQuestion
                key={question._id}
                question={question}
                deleteQuestion={deleteQuestion}
              />
            </li>
          ))}
        </ol>

        <Button onClick={() => displayQuestions()}>
          {showAddQuestion ? "Go Back" : "Add Questions to Set"}
        </Button>
        {showAddQuestion && (
          <AddQuestion
            className="addQuestion"
            onAddQuestions={onAddQuestions}
            currentQuestions={currentSet.questions}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSet;
