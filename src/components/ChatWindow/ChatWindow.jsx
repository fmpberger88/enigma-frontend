import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessagesInChat, sendMessageToChat } from '../../api.jsx';
import Loading from "../Loading/Loading.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ChatWindow = ({ chat }) => {
    const [newMessage, setNewMessage] = useState('');
    const queryClient = useQueryClient();

    // Fetch Messages
    const { data: messages = [], isLoading, isError } = useQuery({
        queryKey: ['messages', chat.id],
        queryFn: () => getMessagesInChat(chat.id),
        staleTime: 5000,
    });

    // Mutation for sending a message
    const sendMessageMutation = useMutation({
        mutationFn: ({ chatId, content }) => sendMessageToChat(chatId, content),
        onMutate: async (newMessage) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['messages', chat.id] });

            // Snapshot the previous value
            const previousMessages = queryClient.getQueryData(['messages', chat.id]);

            // Optimistically update to the new value
            queryClient.setQueryData(['messages', chat.id], (oldMessages) => [
                ...oldMessages,
                {
                    id: Math.random().toString(36).substring(7), // Generate a temporary ID
                    content: newMessage.content,
                    senderId: chat.userId,  // Assuming chat.userId is the current user
                    chatId: newMessage.chatId,
                    createdAt: new Date().toISOString(),
                },
            ]);

            // Return a context object with the snapshotted value
            return { previousMessages };
        },
        onError: (err, newMessage, context) => {
            queryClient.setQueryData(['messages', chat.id], context.previousMessages);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', chat.id] });
        },
    });

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            sendMessageMutation.mutate({ chatId: chat.id, content: newMessage });
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
        <div className="chat-window">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.senderId === chat.userId ? 'sent' : 'received'}`}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} disabled={sendMessageMutation.isLoading}>
                    {sendMessageMutation.isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
