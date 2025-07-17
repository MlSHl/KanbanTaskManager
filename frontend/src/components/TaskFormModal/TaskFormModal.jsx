import TaskForm from "../TaskForm/TaskForm";
import "./TaskFormModal.css";
import Modal from "../Modal/Modal";

function TaskFormModal({ onClose, onAddTask, onUpdateTask, boardId, status, existingTask, setSelectedTask }) {
    return (
        <Modal onClose={onClose}>
            <TaskForm
                onClose={onClose}
                onAddTask={onAddTask}
                onUpdateTask={onUpdateTask}
                boardId={boardId}
                status={status}
                task={existingTask}
                setSelectedTask={setSelectedTask}
            />
        </Modal>
    );
}

export default TaskFormModal;
