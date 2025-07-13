import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import "./KanbanBoard.css";
import { reorderTasks } from "../../api/taskApi";

function KanbanBoard({tasks, setTasks}){
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
        setTasks(updatedTasks);
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

    let content = <DragDropContext onDragEnd={handleDragEnd}>
        <Column title="To Do" tasks={todo}/>  
        <Column title="In Progress" tasks={inProgress}/>  
        <Column title="Done" tasks={done}/>  
    </DragDropContext>
    return <div className="kanbanBoard">
        {content}
    </div>
}

export default KanbanBoard;