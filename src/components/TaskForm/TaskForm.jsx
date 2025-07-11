import { useState } from 'react';
import "./TaskForm.css";

function TaskForm({onAddTask, onClose}){
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("To Do");

    function handleSubmit(e){
        e.preventDefault();
        if(!title.trim()) return;

        const newTask = {
            id: Date.now(),
            title,
            status
        };

        onAddTask(newTask);
        setTitle("");
        setStatus("To Do");

        onClose();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Task title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>    
                <option value="In Progress">In Progress</option>    
                <option value="Done">Done</option>    
            </select> 
            <button type='submit'>Add Task</button>
        </form>
    );
}

export default TaskForm;