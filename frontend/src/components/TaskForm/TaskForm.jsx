import { useEffect } from 'react';
import "./TaskForm.css";
import { createTask } from '../../api/taskApi';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../validationSchemas";

function TaskForm({ onAddTask, onClose, boardId, status, task, onUpdateTask, setSelectedTask }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || ""
    }
  });

  useEffect(() => {
    if (task) {
      setValue("title", task.title || "");
      setValue("description", task.description || "");
    }
  }, [task, setValue]);

  const onSubmit = async (formData) => {
    const taskData = {
      ...formData,
      boardId,
      status,
      id: task?.id
    };

    try {
      if (task) {
        await onUpdateTask(taskData);
      } else {
        const response = await createTask(taskData);
        onAddTask(response.data);
      }

      onClose();
      setSelectedTask(null);
    } catch (error) {
      console.error("Task save failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='Task title'
        {...register("title")}
        className={errors.title ? "invalid" : ""}
      />
      {errors.title && <p className="task-error">{errors.title.message}</p>}

      <textarea
        placeholder="Description"
        {...register("description")}
        className={`task-textarea ${errors.description ? "invalid" : ""}`}
      />
      {errors.description && <p className="task-error">{errors.description.message}</p>}

      <button type='submit'>{task ? "Update Task" : "Add Task"}</button>
    </form>
  );
}

export default TaskForm;
