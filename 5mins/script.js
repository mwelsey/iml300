import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBI5NZfm-DLjE3n_B3O81sY2Ar2GY9r1VU",
    authDomain: "megan-bf23d.firebaseapp.com",
    projectId: "megan-bf23d",
    storageBucket: "megan-bf23d.firebasestorage.app",
    messagingSenderId: "227294855047",
    appId: "1:227294855047:web:ed486d13c5c585c37b1d22",
    measurementId: "G-4C9K64JXDW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wordsRef = ref(db, "responses");

const video = document.getElementById("video-bg");

// DEBUG: Log to console when video is actually ready to play
video.addEventListener("canplaythrough", () => {
    console.log("Video is fully loaded and ready!");
});

// Force play logic
video.play().catch(() => console.log("Waiting for click..."));

window.addEventListener(
    "click",
    () => {
        if (video.paused) video.play();
    },
    { once: true }
);

// Timer Logic
const fourMinutes = 3 * 60 * 1000;
setTimeout(() => {
    triggerCleanse();
}, fourMinutes);

// Firebase listener
onChildAdded(wordsRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.text) {
        spawnWord(data.text);
    }
});

function spawnWord(text) {
    const x = Math.random() * (window.innerWidth - 200) + 50;
    const y = Math.random() * (window.innerHeight - 100) + 50;
    const wordElement = $('<div class="floating-word"></div>').text(text).css({ left: x, top: y });
    $("#word-layer").append(wordElement);
}

function triggerCleanse() {
    $(".floating-word, #qr-code").fadeOut(3000);
    $("#video-bg").css("filter", "brightness(1) contrast(1)");
}

$(document).keydown(function (e) {
    if (e.key.toLowerCase() === "c") triggerCleanse();
});
