let words = [];
let currentIndex = 0;

// Load words from data.json
async function loadWords() {
    const response = await fetch('data.json');
    words = await response.json();
    loadWord(currentIndex);
}

// Display current word info
function loadWord(index) {
    const w = words[index];

    document.getElementById("word-title").innerText = w.word;
    document.getElementById("definition-it").innerText = "🇮🇹 " + w.it;
    document.getElementById("definition-zh").innerText = "🇨🇳 " + w.zh;
    document.getElementById("definition-en").innerText = "🇬🇧 " + w.en;
    document.getElementById("example-sentence").innerText = w.example;
}

// Next & Prev buttons
document.getElementById("next-btn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % words.length;
    loadWord(currentIndex);
});

document.getElementById("prev-btn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    loadWord(currentIndex);
});

// Wrong word system (localStorage)
document.getElementById("mark-wrong-btn").onclick = () => {
    let wrong = JSON.parse(localStorage.getItem("wrongWords") || "[]");

    if (!wrong.includes(words[currentIndex].word)) {
        wrong.push(words[currentIndex].word);
        localStorage.setItem("wrongWords", JSON.stringify(wrong));
        alert("已加入错题本！");
    }
};

// Review wrong words
document.getElementById("review-btn").onclick = () => {
    let wrong = JSON.parse(localStorage.getItem("wrongWords") || "[]");

    if (wrong.length === 0) {
        alert("太棒了！没有错词！");
        return;
    }

    let list = wrong.join("\n");
    alert("错题本：\n" + list);
};

// Initialize
loadWords();
