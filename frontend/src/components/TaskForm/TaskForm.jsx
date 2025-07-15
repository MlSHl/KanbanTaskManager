import { useState } from 'react';
import "./TaskForm.css";
import { createTask } from '../../api/taskApi';

function TaskForm({onAddTask, onClose}){
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("To Do");
    const [description, setDescription] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(!title.trim()) return;

        const newTask = {title,status,description};

        try{
            const response = await createTask(newTask);
            const createdTask = response.data;
            onAddTask(createdTask);

            setTitle("");
            setStatus("To Do");
            onClose();
        }catch(error){
            console.error("Task creation failed: ", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Task title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
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