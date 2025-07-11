import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import TaskFormModal from "./components/TaskFormModal/TaskFormModal"
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Add first feature", status:"In Progress"},
    {id: 2, title: "Add styling", status:"In Progress"},
    {id: 3, title: "Add kanban layout", status:"To Do"},
    {id: 4, title: "Do Quick Start for React", status:"Done"}
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal(){
    setIsModalOpen(true);
  }

  function closeModal(){
    setIsModalOpen(false);
  }
  return (
    <div className="App">
      <h1>Kanban Task Manager</h1>
      <button className="add-task-btn" onClick={openModal}>Add Task</button>
      {isModalOpen && <TaskFormModal onClose={closeModal} onAddTask={(newTask) => setTasks([...tasks, newTask])} /> }
      <KanbanBoard tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
