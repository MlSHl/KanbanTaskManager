import TaskForm from "../TaskForm/TaskForm";
import "./TaskFormModal.css";

function TaskFormModal({onClose, onAddTask}){
    return (
    <div className="modal-backdrop">
        <div className="modal-content">
            <button className="close-button" onClick={onClose}>×</button>
            <TaskForm onAddTask={onAddTask} onClose={onClose}/>
        </div>
    </div>
    )
}

export default TaskFormModal;