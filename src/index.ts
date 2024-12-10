document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
    const stopBtn = document.querySelector('.stop-btn') as HTMLButtonElement;
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
        });

        recogintion.onresult = (event: any) => {
            let buffer = "";
            for (let i  = event.resultIndex; i < event.results.length; ++i) {
                const transcript = event.results[i][0].transcript;
                
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    buffer += transcript;
                }
            }
        };

        recogintion.onend = () => {
            console.log("rec ended");
            if (finalTranscript) {
                console.log("final transcript: ", finalTranscript);
            }
        }

        recogintion.onerror = (event: any) => {
            console.log("speech rec err: ", event.error);
        }

    }
});