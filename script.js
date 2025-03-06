async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput.trim()) return;

    appendMessage("user", userInput);
    document.getElementById("userInput").value = "";

    let botResponse = await getBotResponse(userInput);
    appendMessage("bot", botResponse);
}

function appendMessage(sender, message) {
    let chatbox = document.getElementById("chatbox");
    let msgDiv = document.createElement("div");
    msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = message;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function getBotResponse(userInput) {
    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "system", content: "You are a helpful AI assistant." },
                           { role: "user", content: userInput }],
                max_tokens: 200
            })
        });

        const data = await response.json();
        return data.choices[0].message.content || "I'm sorry, I couldn't process that.";
    } catch (error) {
        console.error("Error fetching response:", error);
        return "Oops! Something went wrong.";
    }
}
