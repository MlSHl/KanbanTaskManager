import { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Add first feature", status:"In Progress"},
    {id: 2, title: "Add kanban layout", status:"To Do"},
    {id: 3, title: "Do Quick Start for React", status:"Done"}
  ])
  return (
    <div className="App">
      <h1>Kanban Task Manager</h1>
      <KanbanBoard tasks={tasks}/>
    </div>
  );
}

export default App;
