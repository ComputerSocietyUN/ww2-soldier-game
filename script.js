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

// Número de WhatsApp actualizado
const whatsappNumber = "573008811367";

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
        
        // Añadir el botón de WhatsApp
        const whatsappLink = document.createElement('div');
        whatsappLink.className = 'whatsapp-container';
        whatsappLink.innerHTML = `
            <a href="https://wa.me/${whatsappNumber}?text=Hola,%20estoy%20sintiendo%20${emotion}%20y%20necesito%20ayuda" 
               class="whatsapp-btn" target="_blank">
                Hablar con un consejero
            </a>
        `;
        adviceText.appendChild(whatsappLink);
        
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
        
        // Actualizar visual de respiración inmediatamente
        breathingCircle.classList.add('expand');
        breathingInstruction.textContent = breathingInstructions.inhale;
        
        // Actualizar el porcentaje de llenado
        updateBreathingFill(0);

        breathingInterval = setInterval(() => {
            switch(phase) {
                case 0: // Inhale
                    breathingCircle.classList.add('expand');
                    breathingInstruction.textContent = breathingInstructions.inhale;
                    
                    // Animación de llenado
                    animateBreathingFill(0, 100, 4000);
                    
                    phase = 1;
                    break;
                case 1: // Hold
                    breathingInstruction.textContent = breathingInstructions.hold;
                    phase = 2;
                    break;
                case 2: // Exhale
                    breathingCircle.classList.remove('expand');
                    breathingInstruction.textContent = breathingInstructions.exhale;
                    
                    // Animación de vaciado
                    animateBreathingFill(100, 0, 4000);
                    
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
        updateBreathingFill(0);
    }
    
    function updateBreathingFill(percentage) {
        breathingCircle.style.background = `conic-gradient(
            var(--button-color) ${percentage}%, 
            rgba(46, 204, 113, 0.3) ${percentage}%
        )`;
    }
    
    function animateBreathingFill(start, end, duration) {
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentPercentage = start + (end - start) * progress;
            
            updateBreathingFill(currentPercentage);
            
            if (progress < 1 && isBreathing) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
});
