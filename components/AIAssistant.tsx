"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: "user", content: trimmed };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userMessage: trimmed,
                    conversationHistory: messages,
                }),
            });

            const data = await res.json();

            if (res.ok && data.response) {
                setMessages([
                    ...updatedMessages,
                    { role: "assistant", content: data.response },
                ]);
            } else {
                setMessages([
                    ...updatedMessages,
                    {
                        role: "assistant",
                        content:
                            "I apologize — there was a temporary issue. Please try again.",
                    },
                ]);
            }
        } catch {
            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content:
                        "Connection issue. Please check your network and try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                className="ai-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle AI Assistant"
            >
                {isOpen ? (
                    <span className="ai-toggle-icon">✕</span>
                ) : (
                    <span className="ai-toggle-icon">◈</span>
                )}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className={`ai-panel${isExpanded ? " ai-panel-expanded" : ""}`}>
                    {/* Header */}
                    <div className="ai-panel-header">
                        <div className="ai-panel-header-left">
                            <div className="ai-panel-status-dot"></div>
                            <div>
                                <div className="ai-panel-title">Strategic Consultant</div>
                                <div className="ai-panel-subtitle">Ramjit Ray AI Engine</div>
                            </div>
                        </div>
                        <div className="ai-panel-actions">
                            <button
                                className="ai-panel-expand"
                                onClick={() => setIsExpanded(!isExpanded)}
                                aria-label={isExpanded ? "Collapse" : "Expand"}
                            >
                                {isExpanded ? "⤡" : "⤢"}
                            </button>
                            <button
                                className="ai-panel-close"
                                onClick={() => { setIsOpen(false); setIsExpanded(false); }}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="ai-messages">
                        {messages.length === 0 && (
                            <div className="ai-welcome">
                                <div className="ai-welcome-icon">◈</div>
                                <p className="ai-welcome-title">
                                    Ramjit Ray AI Consulting Engine
                                </p>
                                <p className="ai-welcome-desc">
                                    25 years of strategic frameworks at your disposal. Share your
                                    business challenge — I&apos;ll diagnose before I prescribe.
                                </p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`ai-msg ${msg.role === "user" ? "ai-msg-user" : "ai-msg-assistant"
                                    }`}
                            >
                                <div className="ai-msg-bubble">
                                    {msg.content.split("\n").map((line, j) => (
                                        <span key={j}>
                                            {line}
                                            {j < msg.content.split("\n").length - 1 && <br />}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="ai-msg ai-msg-assistant">
                                <div className="ai-msg-bubble ai-typing">
                                    <span className="ai-dot"></span>
                                    <span className="ai-dot"></span>
                                    <span className="ai-dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="ai-input-area">
                        <textarea
                            ref={inputRef}
                            className="ai-input"
                            placeholder="Describe your business challenge..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            className="ai-send-btn"
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            aria-label="Send message"
                        >
                            →
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
