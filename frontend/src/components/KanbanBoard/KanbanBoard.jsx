import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import "./KanbanBoard.css";
import { reorderTasks, findTaskById, updateTask } from "../../api/taskApi";
import TaskFormModal from "../TaskFormModal/TaskFormModal";
import { useState } from "react";
import { getBoardById } from "../../api/boardApi";

function KanbanBoard({tasks, setTasks, setIsModalOpen, isModalOpen, boardId}){
    const [columnStatus, setColumnStatus] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    let todo = [];
    let inProgress = [];
    let done = [];
    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].status === "To Do"){
            todo.push(tasks[i]);
        }else if(tasks[i].status === "In Progress"){
            inProgress.push(tasks[i])
        }else{
            done.push(tasks[i])
        }
    }

    function openModalForColumn(actvieColumnStatus){
        setColumnStatus(actvieColumnStatus);
        setSelectedTask(null);
        setIsModalOpen(true);
    }

    function closeModal(){
        setIsModalOpen(false);
    }

    async function handleEditTask(taskId) {
        try {
            const response = await findTaskById(taskId);
            const task = response.data;
            setSelectedTask(task);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch task:", error);
        }
    }


    async function handleDragEnd(result){
        console.log("Drag result: ", result)
        if(!result.destination)return
        const { source, destination } = result;
        const fromIndex = source.index;
        const toIndex = destination.index;
        const sourceStatus = source.droppableId;
        const destStatus = destination.droppableId;

        const columns = {
            "To Do": tasks.filter(t => t.status === "To Do").sort((a, b) => a.orderNumber - b.orderNumber),
            "In Progress": tasks.filter(t => t.status === "In Progress").sort((a, b) => a.orderNumber - b.orderNumber),
            "Done": tasks.filter(t => t.status === "Done").sort((a, b) => a.orderNumber - b.orderNumber),
        };

        const sourceTasks = columns[sourceStatus];
        const destTasks = columns[destStatus];

        const [movedTask] =  sourceTasks.splice(fromIndex, 1);
        const updatedTask = {...movedTask, status: destStatus}

        destTasks.splice(toIndex, 0, updatedTask);

        // const updatedTasks= [
        //     ...(sourceStatus === "To Do" ? sourceTasks : destStatus === "To Do" ? destTasks : columns["To Do"]),
        //     ...(sourceStatus === "In Progress" ? sourceTasks : destStatus === "In Progress" ? destTasks : columns["In Progress"]),
        //     ...(sourceStatus === "Done" ? sourceTasks : destStatus === "Done" ? destTasks : columns["Done"]),
        // ];
        const updatedTasks = Object.keys(columns).flatMap((status) => {
            if (status === destStatus) return sourceTasks;
            if (status === sourceStatus) return destTasks;
            return columns[status]
        });

        const updatedTasksWithOrder = updatedTasks.map((task, index) =>({
            ...task,
            orderNumber: index,
        }));

        setTasks(updatedTasksWithOrder);
        console.log("Moved task:", movedTask);
        console.log("From index:", fromIndex, "To index:", toIndex);
        console.log("From:", sourceStatus, "To:", destStatus);

        try{
            const reorderRequest = {
                fromIndex,
                toIndex,
                status: destStatus
            }
            await reorderTasks(movedTask.id, reorderRequest);
        }catch(error){
            console.error("Could not update the task: ", error);
        }
    }

    async function handleUpdateTask(updatedTask){
        try{
        await updateTask(updatedTask);
        const response = await getBoardById(boardId);
        const updatedTasks = response.data;
        setTasks(updatedTasks);
        const updatedTasksWithOrder = updatedTasks.map((task, index) =>({
            ...task,
            orderNumber: index,
        }));

        setTasks(updatedTasksWithOrder);
        }catch(error){
            console.log("Could not update task: ", updatedTask, error);
        }
    }

    let content = <DragDropContext onDragEnd={handleDragEnd}>
        <Column title="To Do" tasks={todo} openModal={() => openModalForColumn("To Do")} onEditTask={handleEditTask}/>  
        <Column title="In Progress" tasks={inProgress} openModal={() => openModalForColumn("In Progress")} onEditTask={handleEditTask}/>  
        <Column title="Done" tasks={done} openModal={() => openModalForColumn("Done")} onEditTask={handleEditTask}/>  
    </DragDropContext>
    return <div className="kanbanBoard">
        {content}
        {isModalOpen && (
            <TaskFormModal
                onClose={closeModal}
                onAddTask={(newTask) => setTasks([...tasks, newTask])}
                onUpdateTask={(updatedTask) => handleUpdateTask(updatedTask) }
                boardId={boardId}
                status={columnStatus}
                existingTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
        )}
    </div>
}

export default KanbanBoard;