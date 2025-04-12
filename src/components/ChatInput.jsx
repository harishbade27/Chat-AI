import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FiSend } from "react-icons/fi";
import { FaStar, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const ChatInput = ({ theme, input, setInput, messages, setMessages, isSidebarOpen }) => {
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [copyToast, setCopyToast] = useState("");
  const [aiTyping, setAiTyping] = useState("");

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const suggestions = [
    "Good morning, I need assistance.",
    "Hello, could you help me with a task?",
    "Good afternoon, I have a question.",
  ];

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(storedMessages);
  }, [setMessages]);

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
  }, [setInput]);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    }
  };

  const handleSend = async (customInput) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: messageText,
    };

    setInput("");
    setLoading(true);
    setShowIntro(false);
    setAiTyping("");

    setMessages((prev) => {
      const updatedMessages = [...prev, userMessage];
      localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
      return updatedMessages;
    });

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDgirBU_2uaUzKgM1C7Qlyf9oQruiNd9Vk",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: messageText }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "The server is busy at the moment. Please try again shortly 😊";

      let i = 0;
      setAiTyping("");
      const typingInterval = setInterval(() => {
        setAiTyping((prev) => prev + aiText[i]);
        i++;
        if (i === aiText.length) {
          clearInterval(typingInterval);
          setAiTyping("");
          setMessages((prev) => {
            const updatedMessages = [...prev, { role: "ai", content: aiText }];
            localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
            return updatedMessages;
          });
        }
      }, 50);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const updatedMessages = [...prev, { role: "ai", content: "Something went wrong." }];
        localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      setAiTyping("");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyToast("Copied!");
        setTimeout(() => setCopyToast(""), 3000);
      },
      (err) => console.error("Error copying text: ", err)
    );
  };

  return (
    <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
      {showIntro && (
        <div className="flex flex-col items-center mb-10 w-full">
          <FaStar className="text-yellow-400 text-3xl mb-2" />
          <h2 className={`text-lg font-semibold text-center ${theme.text}`}>Hi, I’m Najm Co-Pilot</h2>
          <p className={`text-sm mt-1 text-center ${theme.text}`}>How can I help you?</p>
        </div>
      )}

      <div className="w-full mb-6 max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scroll" style={{ scrollbarWidth: "thin" }}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`relative pt-4 pr-6 pb-2 pl-4 rounded-xl text-sm break-words w-fit max-w-[90%] sm:max-w-[600px] ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"}`}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                      </a>
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>

              {msg.role !== "user" && (
                <button
                  onClick={() => copyToClipboard(msg.content)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  title="Copy to clipboard"
                >
                  <MdContentCopy size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="w-full flex justify-center items-center py-8">
            <FaStar className="animate-spin text-yellow-400 text-3xl" />
          </div>
        )}

        {aiTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl text-sm break-words w-fit max-w-[90%] sm:max-w-[600px] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
              <ReactMarkdown>{aiTyping}</ReactMarkdown>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex items-center px-4 py-4 mb-2">
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

        <button
          type="button"
          onClick={handleMicClick}
          className={`ml-2 p-2 rounded-full transition ${isListening ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"} hover:scale-105`}
          title={isListening ? "Stop Listening" : "Start Voice Input"}
        >
          {isListening ? <FaMicrophoneSlash className="w-5 h-5" /> : <FaMicrophone className="w-5 h-5" />}
        </button>

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={loading}
          className="ml-2 p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 transition"
        >
          <FiSend className="w-5 h-5" style={{ transform: "rotate(43deg)" }} />
        </button>
      </div>

      {
        showIntro && (
          <div className="w-full flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            {suggestions.map((text, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setShowIntro(false);
                  handleSend(text);
                }}
                className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 px-4 py-2 rounded-full hover:bg-blue-300 dark:hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                {text}
              </button>
            ))}
          </div>
        )
      }

      {copyToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50 text-sm">
          {copyToast}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
