"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TrainingConfig {
    core_identity: string;
    strategic_positioning: string;
    frameworks: string;
    case_examples: string;
    tone_adjustments: string;
}

const FIELDS: { key: keyof TrainingConfig; label: string }[] = [
    { key: "core_identity", label: "Core Identity" },
    { key: "strategic_positioning", label: "Strategic Positioning" },
    { key: "frameworks", label: "Framework Library" },
    { key: "case_examples", label: "Case Examples" },
    { key: "tone_adjustments", label: "Tone Adjustments" },
];

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [config, setConfig] = useState<TrainingConfig | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [recordingField, setRecordingField] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = useRef<any>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const fetchConfig = useCallback(async (pw: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin", {
                headers: { "x-admin-password": pw },
            });
            if (res.status === 401) {
                setError("Invalid password.");
                setAuthenticated(false);
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setConfig(data);
            setAuthenticated(true);
        } catch {
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;
        await fetchConfig(password);
    };

    const handleSave = async (field: keyof TrainingConfig) => {
        if (!config) return;
        setSaving(field);
        try {
            const res = await fetch("/api/admin", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": password,
                },
                body: JSON.stringify({ field, value: config[field] }),
            });
            if (!res.ok) throw new Error("Failed to save");
            showToast(`${FIELDS.find((f) => f.key === field)?.label} updated.`);
        } catch {
            showToast("Save failed. Please try again.");
        } finally {
            setSaving(null);
        }
    };

    const toggleMic = (field: keyof TrainingConfig) => {
        if (recordingField === field) {
            recognitionRef.current?.stop();
            setRecordingField(null);
            return;
        }

        // Stop any existing recording first
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const W = window as any;
        const SpeechRecognitionAPI = W.SpeechRecognition || W.webkitSpeechRecognition;

        if (!SpeechRecognitionAPI) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-IN";
        recognitionRef.current = recognition;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }
            if (transcript && config) {
                setConfig((prev) =>
                    prev
                        ? {
                            ...prev,
                            [field]: prev[field]
                                ? prev[field] + " " + transcript
                                : transcript,
                        }
                        : prev
                );
            }
        };

        recognition.onerror = () => setRecordingField(null);
        recognition.onend = () => setRecordingField(null);

        recognition.start();
        setRecordingField(field);
    };

    useEffect(() => {
        if (error) {
            const t = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(t);
        }
    }, [error]);

    if (!authenticated) {
        return (
            <div className="admin-gate">
                <div className="admin-gate-card">
                    <div className="admin-gate-icon">◈</div>
                    <h1 className="admin-gate-title">Admin Portal</h1>
                    <p className="admin-gate-desc">
                        Matrix Integrated — AI Training Configuration
                    </p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            className="admin-gate-input"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="admin-gate-btn"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Access Portal"}
                        </button>
                    </form>
                    {error && <p className="admin-error">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            {/* Toast */}
            {toast && <div className="admin-toast">{toast}</div>}

            {/* Header */}
            <div className="admin-header">
                <div>
                    <h1 className="admin-header-title">AI Training Configuration</h1>
                    <p className="admin-header-desc">
                        Edit the knowledge blocks below. Changes are reflected immediately
                        in the AI Consulting Engine.
                    </p>
                </div>
                <button
                    className="admin-logout-btn"
                    onClick={() => {
                        setAuthenticated(false);
                        setPassword("");
                        setConfig(null);
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Sections */}
            {config &&
                FIELDS.map(({ key, label }) => (
                    <div key={key} className="admin-section">
                        <div className="admin-section-header">
                            <h2 className="admin-section-title">{label}</h2>
                            <div className="admin-section-actions">
                                <button
                                    className={`admin-mic-btn${recordingField === key ? " recording" : ""}`}
                                    onClick={() => toggleMic(key)}
                                    aria-label={recordingField === key ? "Stop recording" : "Start voice input"}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="1" width="6" height="11" rx="3" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                                </button>
                                <button
                                    className="admin-save-btn"
                                    onClick={() => handleSave(key)}
                                    disabled={saving === key}
                                >
                                    {saving === key ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="admin-textarea"
                            value={config[key]}
                            onChange={(e) =>
                                setConfig({ ...config, [key]: e.target.value })
                            }
                            rows={8}
                        />
                    </div>
                ))}
        </div>
    );
}
