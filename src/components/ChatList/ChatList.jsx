import NotificationIcon from "../NotificationIcon/NotificationIcon.jsx";
import styles from "./ChatList.module.css"; // Importiere das CSS-Modul

const ChatList = ({ chats = [], selectedChat, onSelectChat, newMessageNotifications = {} }) => {
    return (
        <div className={styles.chatList}>
            {chats.map((chat) => {
                const userNames = chat.users && chat.users.length > 0
                    ? chat.users.map((user) => user.username).join(', ')
                    : 'No users available';

                return (
                    <div
                        key={chat.id}
                        className={`${styles.chatItem} ${chat.id === selectedChat ? styles.selected : ''}`}
                        onClick={() => onSelectChat(chat.id)}
                    >
                        {userNames}
                        {newMessageNotifications[chat.id] && <NotificationIcon />}
                    </div>
                );
            })}
        </div>
    );
};

export default ChatList;
