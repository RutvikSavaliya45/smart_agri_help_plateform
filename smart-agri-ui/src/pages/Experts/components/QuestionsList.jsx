import React from "react";
import QuestionItem from "./QuestionItem";

export default function QuestionsList({ questions, onAnswer, onDelete, onMarkAnswered, onMarkUnanswered }) {
  if (!questions.length) {
    return (
      <section className="card card-pad">
        <p className="text-muted">No questions match your filters.</p>
      </section>
    );
  }

  return (
    <section className="card card-pad">
      <h3>Questions</h3>
      <div className="questions-list">
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            q={q}
            onAnswer={onAnswer}
            onDelete={onDelete}
            onMarkAnswered={onMarkAnswered}
            onMarkUnanswered={onMarkUnanswered}
          />
        ))}
      </div>
    </section>
  );
}
