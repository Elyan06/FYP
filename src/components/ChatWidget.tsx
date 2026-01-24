
import { useState, useRef, useEffect } from "react";
import { Send, Bot, X, MessageCircle, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { sendMessageToAI, ChatMessage } from "@/services/chatService";

const SUGGESTED_QUESTIONS = [
    "How to treat Early Blight?",
    "Why are leaves yellowing?",
    "Prevent Spider Mites",
    "Watering tips"
];

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: "Hi! I'm your AI Plant Doctor. I can help diagnose diseases and suggest treatments. How can I help today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSendMessage = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const responseText = await sendMessageToAI(text);

            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence mode="wait">
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                onClick={() => setIsOpen(true)}
                                size="lg"
                                className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-tr from-primary to-green-400 border-2 border-white/20 hover:shadow-primary/50 transition-shadow"
                            >
                                <MessageCircle className="w-8 h-8 text-white" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-background/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary/90 text-primary-foreground flex justify-between items-center shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-full">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Plant Doctor AI</h3>
                                    <p className="text-xs text-white/80 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" /> Online
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 text-white rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-hidden relative bg-gradient-to-b from-background to-secondary/20">
                            <ScrollArea className="h-full p-4" ref={scrollRef}>
                                <div className="space-y-4 pb-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                                }`}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-secondary text-foreground'
                                                    }`}
                                            >
                                                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                                                    ? 'bg-primary text-primary-foreground rounded-tr-none font-medium'
                                                    : 'bg-secondary text-foreground border border-border rounded-tl-none'
                                                    }`}
                                            >
                                                <p className="leading-relaxed">{msg.text}</p>
                                                <span className="text-[10px] opacity-70 block mt-1 text-right">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </motion.div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                                            </div>
                                            <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            {/* Overlay suggestions if chat is short */}
                            {messages.length < 3 && (
                                <div className="absolute bottom-4 left-0 right-0 px-4 overflow-x-auto">
                                    <div className="flex gap-2">
                                        {SUGGESTED_QUESTIONS.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => handleSendMessage(q)}
                                                className="flex-shrink-0 text-xs bg-background/80 hover:bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shadow-sm backdrop-blur-sm"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-background border-t border-border">
                            <div className="flex gap-2">
                                <Input
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask a question..."
                                    className="flex-1 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/50"
                                    disabled={isTyping}
                                />
                                <Button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputValue.trim() || isTyping}
                                    size="icon"
                                    className="bg-primary hover:bg-primary/90 text-white shadow-sm"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
