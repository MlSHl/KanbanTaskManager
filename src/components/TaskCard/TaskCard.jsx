import './TaskCard.css'

function TaskCard({task}){
    return (
        <div className="taskCard">
            <p>{task.title}</p>
        </div>
    );
}

export default TaskCard;