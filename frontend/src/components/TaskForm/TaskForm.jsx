import { useState } from 'react';
import "./TaskForm.css";
import { createTask } from '../../api/taskApi';

function TaskForm({onAddTask, onClose, boardId, status}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if(!title.trim()) return;

        const newTask = {title,status,description,boardId};
        console.log("📦 Submitting new task:", newTask);

        try{
            const response = await createTask(newTask);
            const createdTask = response.data;
            onAddTask(createdTask);

            setTitle("");
            onClose();
        }catch(error){
            console.error("Task creation failed: ", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Task title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button type='submit'>Add Task</button>
        </form>
    );
}

export default TaskForm;