import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FiSend } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const ChatInput = ({ theme }) => {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, []);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setShowIntro(false);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "",
          "HTTP-Referer": "https://najm-ai.netlify.app",
          "X-Title": "najm-ai",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await res.json();
      const aiMessage = {
        role: "ai",
        content: data.choices?.[0]?.message?.content || "The server is busy at the moment. Please try again shortly 😊",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "ai", content: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto mt-5 flex flex-col items-center px-4 ${theme.text}`}>
      {showIntro && (
        <div className="flex flex-col items-center mb-20 w-full">
          <FaStar className="text-yellow-400 text-3xl mb-2" />
          <h2 className={`text-lg font-semibold text-center ${theme.text}`}>
            Hi, I’m Najm Co-Pilot
          </h2>
          <p className={`text-sm mt-1 text-center ${theme.text}`}>
            How can I help you?
          </p>
        </div>
      )}

      {/* Chat Messages */}
      <div
        className="w-full mb-6 max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scroll"
        style={{ scrollbarWidth: "thin" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="w-full flex justify-center items-center py-8">
            <FaStar className="animate-spin text-yellow-400 text-3xl" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex items-center px-4 py-4 mb-4">
        <input
          placeholder="Ask Najm Co-Pilot"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 h-12 outline-none text-sm bg-transparent text-gray-900 dark:text-gray-100"
        />

        {/* Microphone Button */}
        <button
          type="button"
          onClick={handleMicClick}
          className={`ml-2 p-2 rounded-full transition ${isListening ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"} hover:scale-105`}
          title={isListening ? "Stop Listening" : "Start Voice Input"}
        >
          {isListening ? <FaMicrophoneSlash className="w-5 h-5" /> : <FaMicrophone className="w-5 h-5" />}
        </button>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={loading}
          className="ml-2 p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 transition"
        >
          <FiSend className="w-5 h-5" style={{ transform: "rotate(43deg)" }} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
