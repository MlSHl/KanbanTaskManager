import "./TaskCard.css";

function TaskCard({task, onEditTask}){
    return (
        <div className="taskCard" onClick={() => onEditTask(task.id)}>
            <p>{task.title}</p>
        </div>
    );
}

export default TaskCard;