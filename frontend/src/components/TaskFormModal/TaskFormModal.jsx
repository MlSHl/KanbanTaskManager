import TaskForm from "../TaskForm/TaskForm";
import "./TaskFormModal.css";
import Modal from "../Modal/Modal";

function TaskFormModal({onClose, onAddTask, boardId, status}){
    return (
        <Modal onClose={onClose}>
            <TaskForm onAddTask={onAddTask} onClose={onClose} boardId={boardId} status={status}/>
        </Modal>
    )
}

export default TaskFormModal;