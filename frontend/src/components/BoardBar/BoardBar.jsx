import "./BoardBar.css"
import { useState } from "react";
import Modal from "../Modal/Modal";
import AddMemberForm from "../AddMemberForm/AddMemberForm";

function BoardBar({setSearchTerm, setSelectedTag, setSelectedMember, boardId, members, onAddMember}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="board-bar">
        <input
            className="search-filter"
            placeholder="Search tasks..."
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
            className="tag-dropdown-filter"
            onChange={(e) => setSelectedTag(e.target.value)}
        >
            <option value="">Filter by tag</option>
            {/* Later: populate with available tags */}
        </select>

        <select
            className="members-dropdown-filter"
            onChange={(e) => setSelectedMember(e.target.value)}
        >
            <option value="">Filter by member</option>
            {members?.map((member) => (
            <option key={member.id} value={member.username}>
                {member.username}
            </option>
            ))}
        </select>

            <button className="add-member-btn" onClick={() => setIsModalOpen(true)}>+</button>
            {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
                <AddMemberForm
                    addMember={(username, role) => {
                    onAddMember(username, role);
                    setIsModalOpen(false);
                    }}
                />
            </Modal>
        )}
        </div>
    );
}

export default BoardBar;