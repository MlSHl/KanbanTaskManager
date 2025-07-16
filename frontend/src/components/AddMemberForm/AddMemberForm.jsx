import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import "./AddMemberForm.css"; // Optional styling

function AddMemberForm({ addMember }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Error fetching all users: ", error));
  }, []);

  useEffect(() => {
    const lower = username.toLowerCase();
    const filtered = users.filter((u) =>
      u.username.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
    setShowDropdown(lower.length > 0 && filtered.length > 0);
  }, [username, users]);

  const handleSelect = (selectedUsername) => {
    setUsername(selectedUsername);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    if(role==="") return;
    addMember(username, role);
    setRole("");
    setUsername("");
    setShowDropdown(false);
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
    <div className="input-wrapper">
    <input
        type="text"
        className="add-member-input"
        placeholder="Search for a user..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
    />

    {showDropdown && (
        <div className="suggestions-list">
        {filteredUsers.map((user) => (
            <div
            key={user.id}
            className="suggestion-item"
            onClick={() => handleSelect(user.username)}
            >
            {user.username}
            </div>
        ))}
        </div>
    )}
    </div>
    <select
    className="role-dropdown"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
    >
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="MEMBER">Member</option>
    </select>

    <button type="submit" className="add-member-button">
        Add Member
    </button>
    </form>
  );
}

export default AddMemberForm;
