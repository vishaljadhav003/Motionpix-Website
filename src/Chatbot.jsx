import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import botAnimation from "./assets/bot.json";
import { Player } from "@lottiefiles/react-lottie-player";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const suggestions = [
  "What services do you offer?",
  "Pricing details",
  "Project timeline",
  "Contact info"
];

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [dark, setDark] = useState(true);
  const [voiceOn, setVoiceOn] = useState(false);
  const chatRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const intervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);


  useEffect(() => {
    const saved = localStorage.getItem("chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, typing]);

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Voice not supported");

    const recog = new SpeechRecognition();
    recog.start();

    recog.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
  };

  const speak = (text) => {
    if (!voiceOn) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  const copyText = (text) => {
  navigator.clipboard.writeText(text);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 1500);
};

const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);

  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      type: "file",
      file,
      fileURL,
      content: `Uploaded file: ${file.name}`,
      time: getTime()
    }
  ]);
};
  // ONLY CHANGES APPLIED (clean & minimal)

const [showIntro, setShowIntro] = useState(true);

// REMOVE DARK TOGGLE STATE (not needed)
// const [dark, setDark] = useState(true);

useEffect(() => {
  if (messages.length > 0) setShowIntro(false);
}, [messages]);

// ✅ STREAMING RESPONSE (instead of duplicate messages)
const streamMessage = async (text) => {
    if (intervalRef.current) {
  clearInterval(intervalRef.current);
}
  setTyping(true);
  setIsPaused(false);

  setMessages(prev => [
    ...prev,
    {
      role: "assistant",
      content: "",
      time: getTime(),
      reacting: null
    }
  ]);

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    const full = data.reply || "No response";

    let i = 0;

    intervalRef.current = setInterval(() => {
  if (pausedRef.current) return;

  i++;

  setMessages(prev => {
    const updated = [...prev];
    updated[updated.length - 1].content = full.slice(0, i);
    return updated;
  });

  if (i >= full.length) {
    clearInterval(intervalRef.current);
    setTyping(false);
    speak(full);
  }
}, 20);

  } catch (err) {
    console.log(err);
    setTyping(false);
  }
};
useEffect(() => {
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, []);
const togglePause = () => {
  setIsPaused(prev => {
    pausedRef.current = !prev;
    return !prev;
  });
};

// ✅ SEND MESSAGE FIX (no duplicate)
const sendMessage = (custom) => {
  const text = custom || input;
  if (!text.trim()) return;

  setMessages(prev => [
    ...prev,
    { role: "user", content: text, time: getTime() }
  ]);

  setInput("");

  streamMessage(text);
};
const handleReaction = (index, type) => {
  setMessages(prev =>
    prev.map((msg, i) =>
      i === index
        ? {
            ...msg,
            reacting: msg.reacting === type ? null : type
          }
        : msg
    )
  );
};

  return (
    <div className={`chatbot-global ${dark ? "dark" : "light"}`}>

      {!chatOpen && (
        <button className="chat-toggle" onClick={() => setChatOpen(true)}>
          🤖
        </button>
      )}

      {chatOpen && (
        <div className="chat-window">

          {/* HEADER */}
          <div className="chat-header">
            <div className="chat-title">
              <Player autoplay loop src={botAnimation} className="lottie-avatar" />
              <div>
                <h4>MotionPix AI</h4>
                <p>Online</p>
              </div>
            </div>

            <div className="actions">
              <button onClick={() => setVoiceOn(!voiceOn)}>
                {voiceOn ? "🔊" : "🔇"}
              </button>
              <button onClick={() => setChatOpen(false)}>✕</button>
            </div>
          </div>

          {/* BODY */}
          <div className="chat-body" ref={chatRef}>
            {showIntro && (
                <div className="intro-screen">
                    <h3>👋 Hey there!</h3>
                    <p>Ask anything... I'm here to help 🚀</p>
                </div>
            )}
            {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>

                <div className="msg-text">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                >
                                {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                {children}
                                </code>
                            );
                            },

                            img: ({ ...props }) => (
                            <img {...props} onClick={() => setPreviewImg(props.src)} />
                            )
                        }}
                        >
                        {m.content}
                    </ReactMarkdown>    
                </div>
                        
                <div className="msg-footer">

                {/* ✅ CLICKABLE REACTIONS */}
                {m.role === "assistant" && (
                    <div className="msg-reactions">
                    <span
                        className={m.reacting === "like" ? "active" : ""}
                        onClick={() => handleReaction(i, "like")}
                    >👍</span>

                    <span
                        className={m.reacting === "love" ? "active" : ""}
                        onClick={() => handleReaction(i, "love")}
                    >❤️</span>

                    <span
                        className={m.reacting === "dislike" ? "active" : ""}
                        onClick={() => handleReaction(i, "dislike")}
                    >👎</span>
                    </div>
                )}

                <span>{m.time}</span>

                <button onClick={() => copyText(m.content)}>
                    <i className="bi bi-copy"></i>
                </button>
                
                </div>

            </div>
            ))}
            {typing && messages[messages.length - 1]?.content === "" && (
                <div className="msg assistant">
                    <div className="thinking">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>
            )}
            </div>

          {/* SUGGESTIONS */}
          <div className="chat-suggestions">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
            
          </div>

          {/* INPUT */}
          <div className="chat-input">

            <button className="voice-btn" onClick={startVoice}><i className="bi bi-mic"></i></button>

            <input type="file" id="fileUpload" hidden onChange={handleFile} />

            <button
              className="file-btn"
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <i className="bi bi-folder-fill"></i>
            </button>

            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

           {typing ? (
                <button className="send-btn" onClick={togglePause}>
                    {isPaused ? "▶️" : "⏸️"}
                </button>
                ) : (
                <button className="send-btn" onClick={() => sendMessage()}>
                    ➤
                </button>
            )}

            {copied && <div className="copy-toast">Copied ✅</div>}
          </div>
           {previewImg && (
                <div className="img-preview-overlay" onClick={() => setPreviewImg(null)}>
                    <img src={previewImg} alt="preview" />
                </div>
            )}


        </div>
      )}
    </div>
  );
};

export default Chatbot;