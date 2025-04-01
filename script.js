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

document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.option-btn');
    const adviceBox = document.getElementById('advice-box');
    const adviceText = document.getElementById('advice-text');
    const dialogueTextElement = document.getElementById('dialogue-text');
    const backButton = document.getElementById('back-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const emotion = button.getAttribute('data-emotion');
            showAdvice(emotion);
        });
    });

    backButton.addEventListener('click', () => {
        hideAdvice();
    });

    function showAdvice(emotion) {
        dialogueTextElement.textContent = dialogueText[emotion];
        adviceText.innerHTML = adviceContent[emotion].map(advice => `<p>${advice}</p>`).join('');
        adviceBox.style.display = 'block';
        document.querySelector('.options-container').style.display = 'none';
    }

    function hideAdvice() {
        adviceBox.style.display = 'none';
        document.querySelector('.options-container').style.display = 'flex';
        dialogueTextElement.textContent = '¿Cómo te sientes hoy, soldado?';
    }
}); 