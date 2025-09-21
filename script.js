let assessmentContext = null;

function addMessage(sender, message) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function addUserMessage(message) {
  addMessage("user", message);
}

function addBotMessage(message) {
  addMessage("bot", message);
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addUserMessage(message);
  input.value = "";

  setTimeout(() => {
    const response = generateResponse(message);
    addBotMessage(response);
  }, 600);
}

function displayResults(analysis) {
  const chatbox = document.getElementById("chatbox");
  const resultHTML = `
    <div class="message bot">
      <div class="message-content">
        <strong>📊 CareerMind AI Analysis:</strong><br><br>
        <b>Dominant Trait:</b> ${analysis.topTrait}<br>
        <b>Strengths:</b> ${analysis.strengths}<br>
        <b>Personality Insight:</b> ${analysis.personalityInsight}<br>
        <b>Recommended Careers:</b>
        <ul style="margin-left: 20px;">
          ${analysis.recommendedCareers.map(career => `<li>${career}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
  chatbox.innerHTML += resultHTML;
  chatbox.scrollTop = chatbox.scrollHeight;
}

function addAssessmentContext(analysis) {
  assessmentContext = analysis;
  addBotMessage(`Great! I've analyzed your assessment. Your dominant trait is ${analysis.topTrait}. 
  Feel free to ask me about the recommended career paths or how to develop specific skills!`);
}

function generateResponse(message) {
  message = message.toLowerCase();

  if (assessmentContext && message.includes("career")) {
    return `Based on your ${assessmentContext.topTrait} profile, I recommend focusing on ${assessmentContext.recommendedCareers[0]}. 
    This aligns with your strengths in ${assessmentContext.personalityInsight.split(".")[0].toLowerCase()}. 
    Would you like specific steps to pursue this path?`;
  }

  if (message.includes("hello") || message.includes("hi")) {
    return "Hello! 👋 I'm CareerMind AI. I help guide you toward the right career path. Do you want to start an assessment?";
  }

  if (message.includes("yes")) {
    const analysis = {
      topTrait: "Creative Thinking",
      strengths: "Problem-solving, innovation, adaptability",
      personalityInsight: "You thrive in dynamic environments where you can apply innovative solutions.",
      recommendedCareers: ["Product Designer", "Marketing Strategist", "Entrepreneur"]
    };
    displayResults(analysis);
    addAssessmentContext(analysis);
    return "I've generated your career assessment results!";
  }

  return "I'm here to guide you with career insights. Try asking me about your career path, skills, or opportunities!";
}
