document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
    const stopBtn = document.getElementById('stop-btn') as HTMLButtonElement;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let finalTranscript: string = '';  

    if (!SpeechRecognition) {
        alert("Speech recogintion is not supported in this browser");
    } else {
        const recogintion = new SpeechRecognition();
        recogintion.continuous = true;
        recogintion.interimResults = true;
        recogintion.lang = 'en-US';

        startBtn?.addEventListener("click", () => {
            recogintion.start();
            startBtn.disabled = true;
            stopBtn.disabled = false;
            finalTranscript = '';
            console.log("rec");
        });

        stopBtn.addEventListener("click", () => {
            recogintion.stop();
            startBtn.disabled = false;
            stopBtn.disabled = true;
            console.log("stop rec");
        })
    }
});