import Column from "../Column/Column";
import "./KanbanBoard.css";

function KanbanBoard({tasks}){
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
    let content = <>
        <Column title="To Do" tasks={todo}/>  
        <Column title="In Progress" tasks={inProgress}/>  
        <Column title="Done" tasks={done}/>  
    </>
    return <div className="kanbanBoard">
        {content}
    </div>
}

export default KanbanBoard;