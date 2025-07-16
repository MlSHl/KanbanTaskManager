import { useEffect, useState } from "react";
import KanbanBoard from "../../../components/KanbanBoard/KanbanBoard";
import TaskFormModal from "../../../components/TaskFormModal/TaskFormModal"
import "./BoardPage.css";
import { getBoardById } from "../../../api/boardApi";

function BoardPage({boardId, boardTitle}){
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        getBoardById(boardId).then(response=>{
            setTasks(response.data)
        })
        .catch(error =>{
            console.error("Error fetching tasks: ", error)
        });
    }, [boardId])


    return (
        <div className="App">
        <h1>{boardTitle}</h1>
        <KanbanBoard tasks={tasks} setTasks={setTasks} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} boardId={boardId}/>
        </div>
    );
}

export default BoardPage;