import NotificationIcon from "../NotificationIcon/NotificationIcon.jsx";
import styles from "./ChatList.module.css"; // Importiere das CSS-Modul

const ChatList = ({ chats, selectedChat, onSelectChat, newMessageNotifications }) => {
    return (
        <ul className={styles.chatList}>
            {chats.map((chat) => (
                <li
                    key={chat.id}
                    className={chat.id === selectedChat?.id ? styles.selected : ''}
                    onClick={() => onSelectChat(chat.id)}
                >
                    {chat.users.map((user) => user.username).join(', ')}
                    {newMessageNotifications[chat.id] && <NotificationIcon />}
                </li>
            ))}
        </ul>
    );
};

export default ChatList;
