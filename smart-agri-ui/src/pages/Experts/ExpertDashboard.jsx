import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExpertDashboard.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import Filters from "./components/Filters";
import QuestionsList from "./components/QuestionsList";

const API_URL = "http://localhost:8080/api/expert";

export default function ExpertDashboard() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchText, setSearchText] = useState("");

  // 🔹 Load questions from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/expert/all")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error loading questions", err));
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/");
  };

  // ✅ Expert gives answer
  const addAnswer = (id, answerText) => {
  if (!answerText.trim()) return;

  fetch(`http://localhost:8080/api/expert/answer/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      answer: answerText,
      status: "COMPLETED",
    }),
  })
    .then((res) => res.json())
    .then((updated) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? updated : q))
      );
    });
};


  const markInProgress = (id) => {
    updateStatus(id, "IN_PROGRESS");
  };

  const markPending = (id) => {
    updateStatus(id, "PENDING");
  };

  const updateStatus = (id, status) => {
  fetch(`http://localhost:8080/api/expert/status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
  .then(res => res.json())
  .then(updated => {
    setQuestions(prev =>
      prev.map(q => q.id === id ? updated : q)
    );
  });
};


  const deleteQuestion = (id) => {
  fetch(`http://localhost:8080/api/expert/${id}`, {
    method: "DELETE"
  }).then(() => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  });
};


  // 🔍 Filters
  const filtered = questions.filter((qq) => {
    if (statusFilter !== "all" && qq.status !== statusFilter) return false;
    if (categoryFilter !== "all" && qq.category !== categoryFilter) return false;
    if (
      searchText &&
      !(
        qq.question.toLowerCase().includes(searchText.toLowerCase()) ||
        qq.farmerName.toLowerCase().includes(searchText.toLowerCase())
      )
    )
      return false;
    return true;
  });

  return (
    <div className="expert-wrap">
      <Sidebar onLogout={handleLogout} setStatusFilter={setStatusFilter} />

      <main className="expert-main">
        <Header />
        <StatsCards questions={questions} />

        <div className="controls-row">
          <Filters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            searchText={searchText}
            setSearchText={setSearchText}
            allCategories={[
              "all",
              ...Array.from(new Set(questions.map((q) => q.category))),
            ]}
          />
        </div>

        <QuestionsList
          questions={filtered}
          onAnswer={addAnswer}
          onDelete={deleteQuestion}
          onMarkAnswered={(id) => updateStatus(id, "COMPLETED")}
          onMarkUnanswered={(id) => updateStatus(id, "PENDING")}
          onMarkInProgress={markInProgress}
        />
      </main>
    </div>
  );
}
