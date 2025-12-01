document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção dos Elementos
    const introScreen = document.getElementById('intro-screen');
    const questScreen = document.getElementById('quest-screen');
    const contentScreen = document.getElementById('content-screen');
    
    const introButton = document.getElementById('intro-button');
    const questButton = document.getElementById('quest-button'); 
    const backButton = document.getElementById('back-button');
    const loadingText = document.getElementById('loading-text');
    const timerDisplay = document.getElementById('countdown-timer');

    let startTime = localStorage.getItem('namoroStartTime');
    let loadingInterval = null; 
   
    function startQuest() {
        introScreen.classList.remove('active');
        questScreen.classList.add('active');
    }


    function startGame() {
       
        if (!startTime) {
            startTime = new Date().getTime(); 
            localStorage.setItem('namoroStartTime', startTime); 
        }
        
       
        questScreen.classList.remove('active');
        contentScreen.classList.add('active');

        
        setInterval(updateTimer, 1000); 
    }


    function checkExistingGame() {
        
        if (startTime) {
            if (loadingInterval) {
                clearInterval(loadingInterval); 
            }
            
           
            introScreen.classList.remove('active');
            questScreen.classList.remove('active');
            contentScreen.classList.add('active');
            
          
            setInterval(updateTimer, 1000); 
            return true; 
        }
        return false; 
    }
    

    function updateTimer() {
        const startTimestamp = new Date(parseInt(startTime)); 
        const now = new Date();
        const difference = now.getTime() - startTimestamp.getTime(); 

        
        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = Math.floor(totalSeconds % 60);

       
        timerDisplay.innerHTML = `
            ${days} dias, 
            ${hours} horas, 
            ${minutes} minutos, 
            ${seconds} segundos
        `;
    }
    
   
    function startLoadingEffect() {
        let dots = 0;
        loadingInterval = setInterval(() => {
            dots = (dots % 3) + 1; 
            loadingText.innerHTML = `Conectando ao Player 2${'.'.repeat(dots)}`;
        }, 500); 


        setTimeout(() => {
            if (!startTime) { 
                clearInterval(loadingInterval); 
                loadingText.innerHTML = "CARREGAMENTO COMPLETO.";

                introButton.classList.remove('hidden-button');
                introButton.style.opacity = 1; 
                introButton.style.pointerEvents = 'auto'; 
            }
        }, 3000); 
    }
    


    if (!checkExistingGame()) {
        startLoadingEffect(); 
    }

    
    if (introButton) {
        introButton.addEventListener('click', startQuest);
    }
    
    if (questButton) {
        questButton.addEventListener('click', startGame);
    }
    
    if (backButton) {
        backButton.addEventListener('click', () => {
             
             window.location.reload(); 
        });
    }
});
