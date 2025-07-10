import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Add first feature", status:"In Progress"},
    {id: 2, title: "Add styling", status:"In Progress"},
    {id: 3, title: "Add kanban layout", status:"To Do"},
    {id: 4, title: "Do Quick Start for React", status:"Done"}
  ])
  return (
    <div className="App">
      <h1>Kanban Task Manager</h1>
      <KanbanBoard tasks={tasks}/>
    </div>
  );
}

export default App;
