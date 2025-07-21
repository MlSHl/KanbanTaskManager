import { useEffect, useState } from "react";
import KanbanBoard from "../../../components/KanbanBoard/KanbanBoard";
import "./BoardPage.css";
import { addUserToBoard, getBoardById, getBoardMembers, getBoardRole } from "../../../api/boardApi";
import BoardBar from  "../../../components/BoardBar/BoardBar";

function BoardPage({boardId, boardTitle}){
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedMember, setSelectedMember] = useState("");
    const [userRole, setUserRole] = useState("");


    useEffect(()=>{
        getBoardById(boardId).then(response=>setTasks(response.data))
        .catch(error =>console.error("Error fetching tasks: ", error));

        getBoardMembers(boardId)
            .then(res => setMembers(res.data))
            .catch((error)=> console.log("Failed to fetch board members:", error));

        getBoardRole(boardId)
        .then(res => setUserRole(res.data)) // <- res.data is the string role
        .catch(err => console.error("Could not get user role", err));
    }, [boardId]);


    async function onAddMember(username, role){
        try{
            console.log("Attempting to add member:", username, role); 
            await addUserToBoard(boardId, username, role); 
            const res = await getBoardMembers(boardId); 
            setMembers(res.data);
        }catch (error){
            console.error("Failed to add member:", error);
            alert("Could not add member. You may not have permission.");
        }
    }


    return (
        <div className="board-page">
        <h1>{boardTitle}</h1>
        <BoardBar setSearchTerm={setSearchTerm} setSelectedTag={setSelectedTag} setSelectedMember={setSelectedMember} boardId={boardId} members={members} onAddMember={onAddMember} userRole={userRole}/>
        <KanbanBoard tasks={tasks} setTasks={setTasks} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} boardId={boardId} searchTerm={searchTerm} selectedTag={selectedTag} selectedMember={selectedMember}/>
        </div>
    );
}

export default BoardPage;