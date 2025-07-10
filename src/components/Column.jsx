import TaskCard from "./TaskCard";

function Column({ tasks, title }){
    const listTasks = tasks.map(tasks =>
            <li key={tasks.id}><TaskCard task={tasks}/></li>
    );

    let content = <>
        <h2>{title}</h2> 

        <div className="column">
            <ul>
                {listTasks}
            </ul>
        </div>
    </>
    return <>{content}</>
}

export default Column;