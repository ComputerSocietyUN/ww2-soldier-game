const adviceContent = {
    ansiedad: [
        "1. Respira profundo y cuenta hasta 4",
        "2. Recuerda que estás a salvo ahora",
        "3. Habla con tus compañeros sobre tus miedos",
        "4. Escribe tus pensamientos en un diario",
        "5. Practica ejercicios de relajación"
    ],
    rabia: [
        "1. Toma un momento para calmar tu respiración",
        "2. Expresa tus sentimientos de manera constructiva",
        "3. Realiza ejercicio físico para liberar tensiones",
        "4. Busca un espacio tranquilo para reflexionar",
        "5. Habla con un superior o consejero militar"
    ],
    estres: [
        "1. Organiza tus tareas por prioridad",
        "2. Toma descansos cortos entre actividades",
        "3. Mantén una rutina de sueño regular",
        "4. Practica técnicas de mindfulness",
        "5. Busca apoyo en tu unidad"
    ]
};

const dialogueText = {
    ansiedad: "Entiendo que sientes ansiedad. Es normal en situaciones de guerra.",
    rabia: "La rabia es una emoción fuerte. Vamos a manejarla juntos.",
    estres: "El estrés es parte de la vida militar. Tienes herramientas para manejarlo."
};

const breathingInstructions = {
    inhale: "Inhala profundamente...",
    hold: "Mantén la respiración...",
    exhale: "Exhala lentamente..."
};

document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.option-btn');
    const adviceBox = document.getElementById('advice-box');
    const adviceText = document.getElementById('advice-text');
    const dialogueTextElement = document.getElementById('dialogue-text');
    const backButton = document.getElementById('back-btn');
    const breathingExercise = document.getElementById('breathing-exercise');
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingInstruction = document.getElementById('breathing-instruction');
    const startBreathingButton = document.getElementById('start-breathing');

    let breathingInterval;
    let isBreathing = false;

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.getAttribute('data-emotion');
            showAdvice(emotion);
        });
    });

    backButton.addEventListener('click', () => {
        hideAdvice();
        stopBreathing();
    });

    startBreathingButton.addEventListener('click', () => {
        if (isBreathing) {
            stopBreathing();
        } else {
            startBreathing();
        }
    });

    function showAdvice(emotion) {
        dialogueTextElement.textContent = dialogueText[emotion];
        adviceText.innerHTML = adviceContent[emotion].map(advice => `<p>${advice}</p>`).join('');
        adviceBox.style.display = 'block';
        breathingExercise.style.display = 'block';
        document.querySelector('.options-container').style.display = 'none';
    }

    function hideAdvice() {
        adviceBox.style.display = 'none';
        breathingExercise.style.display = 'none';
        document.querySelector('.options-container').style.display = 'flex';
        dialogueTextElement.textContent = '¿Cómo te sientes hoy, soldado?';
    }

    function startBreathing() {
        isBreathing = true;
        startBreathingButton.textContent = 'Detener';
        let phase = 0;

        breathingInterval = setInterval(() => {
            switch(phase) {
                case 0: // Inhale
                    breathingCircle.classList.add('expand');
                    breathingInstruction.textContent = breathingInstructions.inhale;
                    phase = 1;
                    break;
                case 1: // Hold
                    breathingInstruction.textContent = breathingInstructions.hold;
                    phase = 2;
                    break;
                case 2: // Exhale
                    breathingCircle.classList.remove('expand');
                    breathingInstruction.textContent = breathingInstructions.exhale;
                    phase = 0;
                    break;
            }
        }, 4000);
    }

    function stopBreathing() {
        isBreathing = false;
        clearInterval(breathingInterval);
        breathingCircle.classList.remove('expand');
        breathingInstruction.textContent = 'Inhala... Exhala...';
        startBreathingButton.textContent = 'Iniciar Ejercicio';
    }
}); 
