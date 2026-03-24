setInterval(() => {
    const messages = ["You are progressing...", "Are you?", "Almost there...", "Keep going."];
    document.getElementById("status").innerText = messages[Math.floor(Math.random() * messages.length)];
}, 1000);
