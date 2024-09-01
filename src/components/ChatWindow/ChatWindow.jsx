import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessagesInChat, sendMessageToChat } from '../../api.jsx';
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import styles from "./ChatWindow.module.css";
import {StyledButton, StyledForm} from "../../styles.jsx";

const ChatWindow = ({ chat, currentUser }) => {
    const [newMessage, setNewMessage] = useState('');
    const queryClient = useQueryClient();

    // Fetch Messages
    const { data: messages = [], isLoading, isError } = useQuery({
        queryKey: ['messages', chat],
        queryFn: () => getMessagesInChat(chat),
        staleTime: 5000,
    });

    // Mutation for sending a message
    const sendMessageMutation = useMutation({
        mutationFn: ({ chatId, content }) => sendMessageToChat(chatId, content),
        onMutate: async (newMessage) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['messages', chat] });

            // Snapshot the previous value
            const previousMessages = queryClient.getQueryData(['messages', chat]);

            // Optimistically update to the new value
            queryClient.setQueryData(['messages', chat], (oldMessages) => [
                ...oldMessages,
                {
                    id: Math.random().toString(36).substring(7), // Generate a temporary ID
                    content: newMessage.content,
                    sender: {
                        id: currentUser.id,   // Ensure sender is the current user
                        username: currentUser.username, // Ensure the username is correct
                    },
                    chatId: newMessage.chatId,
                    createdAt: new Date().toISOString(),
                },
            ]);

            // Return a context object with the snapshotted value
            return { previousMessages };
        },
        onError: (err, newMessage, context) => {
            queryClient.setQueryData(['messages', chat], context.previousMessages);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', chat] });
        },
    });

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            sendMessageMutation.mutate({ chatId: chat, content: newMessage });
            setNewMessage('');
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    return (
        <div className={styles.chatWindow}>
            <div className={styles.messages}>
                {messages.map((message) => (
                    <div key={message.id} className={message?.sender?.id === currentUser.id ? styles.sent : styles.received}>
                        <span style={{fontWeight: "bold"}}>{message?.sender?.username}:</span>  {message?.content}
                    </div>
                ))}
            </div>
            <StyledForm>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <StyledButton onClick={handleSendMessage} disabled={sendMessageMutation.isLoading}>
                    {sendMessageMutation.isLoading ? 'Sending...' : 'Send'}
                </StyledButton>
            </StyledForm>
        </div>
    );
};

export default ChatWindow;
