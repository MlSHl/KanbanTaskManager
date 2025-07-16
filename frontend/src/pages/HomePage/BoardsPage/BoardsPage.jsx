import { useState } from "react";
import { createBoard} from "../../../api/boardApi";
import "./BoardsPage.css";
import CreateBoardForm from "../../../components/CreateBoardForm/CreateBoardForm";
import Modal from "../../../components/Modal/Modal";

function BoardsPage({onSelectBoard, boards, setBoards}){
    const [isModalOpen, setIsModalOpen] = useState(false);


    function openModal(){
        setIsModalOpen(true);
    }

    function closeModal(){
        setIsModalOpen(false);
    }

    const handleCreateBoard = (title) => {
        console.log("Creating board with title:", title);
        createBoard(title)
            .then(response => {
                console.log("Board created:", response.data);
                setBoards(prev => [...prev, response.data]);
                closeModal();
            })
            .catch(error => {
                console.error("Failed to create board: ", error);
            });
    };

    return (
        <div className="board-container">
            {boards.map((board) => (
                <div className="board-card" onClick={() => onSelectBoard(board.id, board.title)} key={board.id}>
                    {board.title}
                </div>
            ))}
            <div className="board-card add-board" onClick={openModal}>+</div>
            {isModalOpen && (<Modal onClose={closeModal}><CreateBoardForm onCreate={handleCreateBoard}/></Modal>)} 
        </div>
    );
}

export default BoardsPage;