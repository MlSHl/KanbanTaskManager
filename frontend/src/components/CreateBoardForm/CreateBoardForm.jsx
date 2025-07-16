import { useState } from "react";

function CreateBoardForm({onCreate}){
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        onCreate(title);
        setTitle("");
    }

    return <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Board Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button type="submit">Create Board</button>
    </form>
}

export default CreateBoardForm;