import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar/TopBar"
import BoardPage from "./BoardPage/BoardPage";
import BoardsPage from "./BoardsPage/BoardsPage";
import SideBar from "../../components/SideBar/SideBar";
import { getBoards } from "../../api/boardApi";
import { jwtDecode } from "jwt-decode";
import "./Home.css"

function Home({setIsAuthenticated}){
    const [board, setBoard] = useState(null);
    const [boards, setBoards] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        console.log("Use Effect running");
        getBoards()
            .then((response) => {
                const boardList = response.data;
                setBoards(boardList);
                if (boardList.length > 0) {
                    setBoard({ id: boardList[0].id, title: boardList[0].title });
                }
            })
            .catch((error) => console.log("Failed to fetch boards: ", error));
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                setUsername(decoded.sub || decoded.username || "User");
            } catch (err) {
                console.error("Invalid JWT token", err);
            }
        }
    }, []);

    function onSelectBoard(boardId, boardTitle){
        setBoard({id: boardId, title: boardTitle})
    }


    return (
        <>
            <TopBar setIsAuthenticated={setIsAuthenticated} username={username} setBoard={setBoard} />
            <div className="main-layout">
                {board !== null && <SideBar onSelectBoard={onSelectBoard} boards={boards} setBoards={setBoards} activeBoardId={board.id}/>}
                {board === null ? <BoardsPage onSelectBoard={onSelectBoard} boards={boards} setBoards={setBoards}/> : <BoardPage boardId={board.id} title={board.title}/>}
            </div>  
        </>
    )

}

export default Home;