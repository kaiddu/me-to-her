document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção dos Elementos
    const introScreen = document.getElementById('intro-screen');
    const questScreen = document.getElementById('quest-screen');
    const contentScreen = document.getElementById('content-screen');
    
    const introButton = document.getElementById('intro-button');
    const questButton = document.getElementById('quest-button'); // O SIM!
    const backButton = document.getElementById('back-button');
    const loadingText = document.getElementById('loading-text');
    const timerDisplay = document.getElementById('countdown-timer');

    let startTime = null; 
    let loadingInterval = null; 

    function startQuest() {
        introScreen.classList.remove('active');
        questScreen.classList.add('active');
       
    function startGame() {
      
        startTime = new Date(); 
        
        questScreen.classList.remove('active');
        contentScreen.classList.add('active');

        setInterval(updateTimer, 1000); 
    }

    function returnToMenu() {
        contentScreen.classList.remove('active');
        questScreen.classList.add('active');
    }
    

    function startLoadingEffect() {
        let dots = 0;
        loadingInterval = setInterval(() => {
            dots = (dots % 3) + 1; 
            loadingText.innerHTML = `Conectando ao Player 2${'.'.repeat(dots)}`;
        }, 500); 


        setTimeout(() => {
            clearInterval(loadingInterval); 
            loadingText.innerHTML = "CARREGAMENTO COMPLETO.";

            
            introButton.classList.remove('hidden-button');
            introButton.style.opacity = 1; 
            introButton.style.pointerEvents = 'auto'; 
        }, 3000); // 
    }

    function updateTimer() {
        if (!startTime) return; 

        const now = new Date();
        const difference = now.getTime() - startTime.getTime(); 

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const s = seconds % 60;
        const m = minutes % 60;
        const h = hours % 24;

        timerDisplay.innerHTML = `
            ${days} dias, 
            ${h} horas, 
            ${m} minutos, 
            ${s} segundos
        `;
    }

    
    startLoadingEffect(); 

    
    if (introButton) {
        introButton.addEventListener('click', startQuest);
    }
    
    if (questButton) {
        questButton.addEventListener('click', startGame);
    }


    if (backButton) {
        backButton.addEventListener('click', returnToMenu);
    }
});
