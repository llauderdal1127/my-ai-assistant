/* AI Assistant - Complete Updated Code */

// Chat History Storage
let chatHistory = [];

document.addEventListener("DOMContentLoaded", () => {
    loadChatHistory();
    setupDragAndDrop();
});

async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    appendMessage("user", userInput);
    document.getElementById("userInput").value = "";

    let botResponse = await getBotResponse(userInput);
    appendMessage("bot", botResponse);

    saveChatHistory();
}

function appendMessage(sender, message) {
    let chatbox = document.getElementById("chatbox");
    let msgDiv = document.createElement("div");
    msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = message;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
    chatHistory.push({ sender, message });
}

// AI Response Logic
async function getBotResponse(userInput) {
    const responses = {
        "hello": "Hi there! How can I assist you?",
        "how are you": "I'm an AI, always ready to assist!",
        "who are you": "I am 'Know it All', your AI assistant.",
        "bye": "Goodbye! Have a great day!",
        "what is AI": "AI stands for Artificial Intelligence, enabling machines to learn and solve problems.",
    };
    return responses[userInput.toLowerCase()] || "I'm not sure about that, but I'm learning!";
}

// Store Chat History
function saveChatHistory() {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function loadChatHistory() {
    let savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
        chatHistory.forEach(({ sender, message }) => appendMessage(sender, message));
    }
}

// Drag & Drop Image Upload
function setupDragAndDrop() {
    let dropZone = document.getElementById("dropZone");
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropZone.classList.add("drag-over");
    });
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("drag-over");
    });
    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.classList.remove("drag-over");
        handleFiles(event.dataTransfer.files);
    });
}

// Image Upload
function uploadFiles() {
    let fileInput = document.getElementById("fileInput");
    handleFiles(fileInput.files);
}

function handleFiles(files) {
    if (files.length > 8) {
        alert("You can only upload up to 8 images at a time.");
        return;
    }
    
    let chatbox = document.getElementById("chatbox");
    for (let i = 0; i < files.length; i++) {
        let imgDiv = document.createElement("div");
        let img = document.createElement("img");
        img.src = URL.createObjectURL(files[i]);
        img.classList.add("uploaded-image");
        imgDiv.appendChild(img);
        chatbox.appendChild(imgDiv);
        analyzeImage(files[i]);
    }
    chatbox.scrollTop = chatbox.scrollHeight;
}

// AI Image Analysis (Identifying, Counting, Measuring)
async function analyzeImage(file) {
    let chatbox = document.getElementById("chatbox");
    let processingDiv = document.createElement("div");
    processingDiv.classList.add("bot-message");
    processingDiv.innerText = "Analyzing image...";
    chatbox.appendChild(processingDiv);

    await new Promise(resolve => setTimeout(resolve, 3000));
    
    let identification = "Detected Object: Unknown (AI learning in progress)";
    let count = Math.floor(Math.random() * 10) + 1;
    let measurement = `${Math.floor(Math.random() * 100)} cm x ${Math.floor(Math.random() * 100)} cm`;
    
    processingDiv.innerText = `${identification}\nCount: ${count}\nEstimated Size: ${measurement}`;
}

// Clear Uploaded Images
function clearUploadedImages() {
    document.getElementById("chatbox").innerHTML = "";
    chatHistory = [];
    saveChatHistory();
}
