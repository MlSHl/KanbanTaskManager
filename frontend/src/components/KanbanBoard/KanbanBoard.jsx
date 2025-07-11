import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import "./KanbanBoard.css";

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

    function handleDragEnd(result){
        console.log("Drag result: ", result)
        if(!result.destination){
            return
        }else{
            const columns = {
                "To Do" : [...todo],
                "In Progress" : [...inProgress],
                "Done" : [...done]
            }
            const sourceTasks = columns[result.source.droppableId];
            const destTasks = columns[result.destination.droppableId];
            const [movedTask] =  sourceTasks.splice(result.source.index, 1);
            movedTask.status = result.destination.droppableId;
            destTasks.splice(result.destination.index, 0, movedTask);

            const newTasks = [
                ...columns["To Do"],
                ...columns["In Progress"],
                ...columns["Done"]
            ];

            setTasks(newTasks);
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