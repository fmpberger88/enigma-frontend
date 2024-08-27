import { useState } from "react";
import {Form} from "react-router-dom";

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
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Start new Chat..."
            />
            <button type="submit">Start Chat</button>
        </Form>
    )
};

export default NewChatForm;