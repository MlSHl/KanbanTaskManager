import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

function Column({ tasks, title }){
    const listTasks = tasks.map(tasks =>
            <TaskCard task={tasks}/>
    );

    let content = <>
        <div className="column">
            <h2>{title}</h2> 
            {listTasks}
        </div>
    </>
    return <>{content}</>
}

export default Column;