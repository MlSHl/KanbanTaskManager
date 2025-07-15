import { useEffect, useState } from "react";
import KanbanBoard from "../../components/KanbanBoard/KanbanBoard";
import TaskFormModal from "../../components/TaskFormModal/TaskFormModal"
import "./BoardPage.css";
import { getAllTasks } from "../../api/taskApi";
import LogoutButton from "../../components/LogoutButton/LogoutButton"

function BoardPage({ setIsAuthenticated }){
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        getAllTasks().then(response=>{
            setTasks(response.data)
        })
        .catch(error =>{
            console.error("Error fetching tasks: ", error)
        });
    }, [])

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
        <LogoutButton setIsAuthenticated={setIsAuthenticated}/>
        {isModalOpen && <TaskFormModal onClose={closeModal} onAddTask={(newTask) => setTasks([...tasks, newTask])} /> }
        <KanbanBoard tasks={tasks} setTasks={setTasks}/>
        </div>
    );
}

export default BoardPage;