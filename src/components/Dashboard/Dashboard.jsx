import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChats, createChat, getCurrentUser } from "../../api.jsx"; // getCurrentUser importieren
import ChatList from "../ChatList/ChatList.jsx";
import ChatWindow from "../ChatWindow/ChatWindow.jsx";
import NewChatForm from "../NewChatForm/NewChatForm.jsx";
import styles from "./Dashboard.module.css"
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const Dashboard = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const queryClient = useQueryClient();

    // Fetch current user
    const { data: currentUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser, // Funktion, um den aktuellen Benutzer abzurufen
    });

    // Fetch Chats
    const { data: chats = [], isLoading, isError } = useQuery({
        queryKey: ['chats'],
        queryFn: getChats,
    });

    // Mutation for creating a new chat
    const createChatMutation = useMutation({
        mutationFn: createChat,
        onSuccess: (newChat) => {
            queryClient.setQueryData(['chats'], (oldChats) => [...oldChats, newChat]);
        }
    });

    const handleNewChat = (username) => {
        createChatMutation.mutate(username)
    };

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        console.log(chat)
    };

    if (isLoading || isUserLoading) {
        return <Loading />
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.chatList}>
                <NewChatForm onNewChat={handleNewChat} />
                <ChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    onSelectChat={handleSelectChat}
                />
            </div>
            <div className={styles.chatWindow}>
                {selectedChat ? (
                    <ChatWindow chat={selectedChat} currentUser={currentUser} /> // currentUser übergeben
                ) : (
                    <div>Select a chat to start messaging</div>
                )}
            </div>
        </div>
    )
};

export default Dashboard;
