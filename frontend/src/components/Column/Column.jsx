import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

function Column({ tasks, title }){
    const listTasks = tasks.map((task, index) =>
            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided)=>(
                    <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className = "task-wrapper">
                        <TaskCard task={task}/>
                    </div>
                )}
            </Draggable> 

    );

    let content = <>
        <div className="columnWrapped">
            <h2>{title}</h2> 
            <Droppable droppableId={title}>
            {(provided) => (
                <div className="column"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                    {listTasks}
                    {provided.placeholder}
                </div>
            )}
            </Droppable>
        </div>
    </>
    return <>{content}</>
}

export default Column;