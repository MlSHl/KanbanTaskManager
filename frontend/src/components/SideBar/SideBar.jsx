import "./SideBar.css"

function SideBar({boards, onSelectBoard, activeBoardId}){

    return (
        <div className="sidebar">
            {boards.map((board) => (
                <div className={`board-item${board.id === activeBoardId ? " active" : ""}`} 
                onClick={() => onSelectBoard(board.id, board.title)} key={board.id}>
                    {board.title}
                </div>
            ))}
        </div>
    )
}

export default SideBar;