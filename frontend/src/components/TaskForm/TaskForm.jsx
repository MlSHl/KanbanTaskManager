import { useState,useEffect } from 'react';
import "./TaskForm.css";
import { createTask} from '../../api/taskApi';

function TaskForm({ onAddTask, onClose, boardId, status, task, onUpdateTask, setSelectedTask }) {
    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
        } else {
            setTitle("");
            setDescription("");
        }
    }, [task]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;

        const taskData = { title, description, status, boardId, id: task?.id };
        try {
            if (task) {
                onUpdateTask(taskData);
            } else {
                const response = await createTask(taskData);
                onAddTask(response.data);
            }

            setTitle("");
            onClose();
            setSelectedTask(null); 
        } catch (error) {
            console.error("Task save failed: ", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Task title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="task-textarea"
            />
            <button type='submit'>{task ? "Update Task" : "Add Task"}</button>
        </form>
    );
}


export default TaskForm;