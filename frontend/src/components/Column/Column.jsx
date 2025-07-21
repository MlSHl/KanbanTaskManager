import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";
import { useState } from "react";

function Column({ tasks, title, openModal, onEditTask }) {
    const [hoveredColumn, setHoveredColumn] = useState(null); 

    const listTasks = tasks.map((task, index) =>
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-wrapper ${task.isVisible ? "" : "invisible-task"}`}
                    style={provided.draggableProps.style}
                >
                    <TaskCard task={task} onEditTask={() => onEditTask(task.id)} />
                </div>
            )}
        </Draggable>
    );

    return (
        <div
            className="column"
            onMouseEnter={() => setHoveredColumn(title)}
            onMouseLeave={() => setHoveredColumn(null)}
        >
            <h2>{title}</h2>
            <Droppable droppableId={title}>
                {(provided) => (
                    <div
                        className="columnWrapper"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {listTasks}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {(hoveredColumn === title || title === "To Do") && (
                <div className="add-task-placeholder" onClick={openModal}>
                    + Add new task
                </div>
            )}
        </div>
    );
}

export default Column;
