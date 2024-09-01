import { useState } from "react";
import {StyledButton, StyledForm} from "../../styles.jsx";

const NewChatForm = ({ onNewChat }) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onNewChat(username);
            setUsername("");
        }
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Start new Chat..."
            />
            <StyledButton type="submit">Start Chat</StyledButton>
        </StyledForm>
    )
};

export default NewChatForm;