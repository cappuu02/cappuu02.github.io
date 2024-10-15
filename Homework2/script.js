document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Disegna il grafico
    drawChartAbsolute(attackersValue, systemValue, probability);
});

document.getElementById('submitButton2').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);

    // Disegna il grafico
    drawChartRelative(attackersValue, systemValue, probability);
});

//FUNZIONE PER GENERAREB GRAFICO CON FREQUENZA ASSOLUTA!
function drawChartAbsolute(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50; // Margine sinistro e destro
    const marginY = 30; // Margine superiore e inferiore
    const chartWidth = canvas.width - marginX * 2; // Larghezza del grafico
    const chartHeight = canvas.height - marginY * 2; // Altezza del grafico
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25); // Posizione X massima per le linee
    const xStep = (maxScoreX - marginX) / systems; // Passo per la posizione X in base ai sistemi

    const initialY = canvas.height / 2; // Centro del canvas

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    const penetrationData = [];
    const penetrationDataTempoT = [];
    const randomLineT = Math.floor(systems / 2);
    console.log("randomLineT", randomLineT);

    // Simula gli attacchi e raccoglie i punteggi di penetrazione
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, initialY); // Inizia dal centro dell'asse Y
        let yPosition = 0;

        for (let j = 0; j <= systems; j++) {
            const penetrated = Math.random() < probability;

            // Modifica la posizione Y
            if (j === 0) {
                yPosition = 0; // Il sistema 0 è la posizione iniziale, quindi non cambia
            } else if (penetrated) {
                yPosition += 1; // Incremento
            } else {
                yPosition -= 1; // Decremento
            }

            // Normalizza la posizione Y per il canvas
            yPosition = Math.max(-systems, Math.min(systems, yPosition)); // Limita yPosition tra -systems e systems
            const y = initialY - (yPosition * (chartHeight / (2 * systems))); // Centralizza sull'asse Y e normalizza

            // Disegna la linea
            ctx.lineTo(marginX + (j * xStep), y);

            if(j === randomLineT) {
                penetrationDataTempoT.push(yPosition);
                console.log("yposition", yPosition);
            }

            
        }

        ctx.strokeStyle = '#009dff96';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Aggiungi il punteggio finale per ogni aggressore
        penetrationData.push(yPosition);
    }

    // Calcola la media dopo il ciclo
    const averagePenetrationScore = computeAverage(penetrationData);

    // Aggiorna la media nell'HTML
    document.getElementById('averageScoreValue').innerText = averagePenetrationScore.toFixed(2);

    // Disegna la linea verticale nel sistema selezionato casualmente
    const randomSystemX = marginX + (randomLineT * xStep);
    ctx.beginPath();
    ctx.moveTo(randomSystemX, marginY);
    ctx.lineTo(randomSystemX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna la linea verticale finale
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    const totalLevels = 2 * systems; // Considera livelli positivi e negativi
    const levelCounts = new Array(totalLevels).fill(0);

    // Popola i punteggi di penetrazione
    penetrationData.forEach(penetration => {
        levelCounts[penetration + systems] += 1; // Offset per consentire livelli negativi
    });

    const totalAttackers = penetrationData.length;

    // Disegna l'istogramma per maxScoreX
    for (let i = -systems; i <= systems; i++) {
        const frequencyAbsolute = levelCounts[i + systems]; // Frequenza assoluta
        const frequencyRelative = frequencyAbsolute / totalAttackers; // Frequenza relativa

        // Disegna le barre dell'istogramma
        const startY = initialY - (i * (chartHeight / (2 * systems))); // Centralizza l'istogramma in Y

        ctx.beginPath();
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + frequencyRelative * 300, startY); // Modifica per la lunghezza relativa
        ctx.strokeStyle = '#06c91b'; // Colore giallo per le barre
        ctx.lineWidth = 4; // Aumenta lo spessore delle barre
        ctx.stroke();
        ctx.closePath();
    }

    // Disegna le linee orizzontali che rappresentano la frequenza relativa per la linea casuale centrale
    const levelCounts2 = new Array(systems * 2 + 1).fill(0); // Un array per tenere conto delle occorrenze

    penetrationDataTempoT.forEach(penetration => {
        levelCounts2[penetration + systems] += 1; // Conta quante volte ogni livello è stato raggiunto
    });

    const centralSystemX = marginX + (randomLineT * xStep); 

    // Disegna le linee orizzontali che rappresentano la frequenza relativa per la linea casuale centrale
    for (let i = -systems; i <= systems; i++) {
        const frequencyAbsolute = levelCounts2[i + systems]; // Frequenza assoluta
        const frequencyRelative = frequencyAbsolute / attackers; // Frequenza relativa

        // Disegna le linee orizzontali per ciascun livello
        const startY = initialY - (i * (chartHeight / (2 * systems))); // Posizione Y per il livello i
        const lineLength = Math.max(frequencyRelative * 300, 1); // Assicurati che la lunghezza sia almeno 1

        ctx.beginPath();
        ctx.moveTo(marginX + randomLineT * xStep, startY); // Parte dalla posizione a tempo t
        ctx.lineTo(marginX + randomLineT * xStep + lineLength, startY); // Aumenta la lunghezza della linea
        ctx.strokeStyle = '#06c91b'; // Colore giallo per le barre laterali
        ctx.lineWidth = 4; // Aumenta lo spessore delle linee
        ctx.stroke();
        ctx.closePath();
    }
}



function drawChartRelative(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50; // Margine sinistro e destro
    const marginY = 30; // Margine superiore e inferiore
    const chartWidth = canvas.width - marginX * 2; // Larghezza del grafico
    const chartHeight = canvas.height - marginY * 2; // Altezza del grafico
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25); // Posizione X massima per le linee
    const xStep = (maxScoreX - marginX) / systems; // Passo per la posizione X in base ai sistemi

    const initialY = canvas.height - marginY; // Posizione iniziale Y impostata in basso

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();


    const randomLineT = Math.floor(systems / 2);
    const penetrationData = [];
    const penetrationDataTempoT = [];

    // Array di colori per le linee
    const colors = [
        '#009dff', // Colore 1
        '#ff5733', // Colore 2
        '#06c91b', // Colore 3
        '#ffcc00', // Colore 4
        '#c70039', // Colore 5
        '#900c3f', // Colore 6
        '#581845', // Colore 7
        '#34495e'  // Colore 8
    ];

    // Simula gli attacchi e raccoglie i punteggi di penetrazione
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, initialY); // Inizia dal basso del canvas
        let successes = 0; // Numero di sistemi manomessi con successo

        // Scegli un colore per la linea corrente
        const lineColor = colors[i % colors.length];
        ctx.strokeStyle = lineColor; // Applica il colore alla linea corrente

        for (let j = 1; j <= systems; j++) { // Inizia da 1 invece che da 0
            const penetrated = Math.random() < probability;

            // Calcola il numero di successi e il relativo rapporto
            if (penetrated) {
                successes += 1;
            }            

            // Calcola il punteggio relativo (successi / sistema attuale)
            const relativeScore = successes / j;
            const y = initialY - (relativeScore * chartHeight); // Posizione Y normalizzata


            if(j === randomLineT) {
                penetrationDataTempoT.push(y);
            }

            // Disegna la linea verticale per il punteggio relativo
            ctx.lineTo(marginX + ((j - 1) * xStep), y); // Sale verticalmente
            ctx.lineTo(marginX + (j * xStep), y); // Sposta orizzontalmente
            

            
            // Disegna le etichette sull'asse X
            if (i === 0) {
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText(`${j}`, marginX + ((j - 1) * xStep) - 10, canvas.height - 10);
            }
        }

        ctx.lineWidth = 2; // Spessore della linea
        ctx.stroke(); // Disegna la linea
        ctx.closePath();

        // Aggiungi il punteggio finale (numero di successi) per ogni aggressore
        penetrationData.push(successes);
    }

    // Calcola la media dopo il ciclo
    const averagePenetrationScore = computeAverage(penetrationData);

    // Aggiorna la media nell'HTML
    document.getElementById('averageScoreValue').innerText = averagePenetrationScore.toFixed(2);

    // Disegna la linea verticale nel sistema selezionato casualmente
    const randomSystemX = marginX + (randomLineT * xStep);
    ctx.beginPath();
    ctx.moveTo(randomSystemX, marginY);
    ctx.lineTo(randomSystemX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna la linea verticale finale
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'istogramma per maxScoreX
    const totalLevels = 2 * systems; // Considera livelli positivi e negativi
    const levelCounts = new Array(totalLevels).fill(0);

    // Popola i punteggi di penetrazione
    penetrationData.forEach(penetration => {
        levelCounts[penetration + systems] += 1; // Offset per consentire livelli negativi
    });

    const totalAttackers = penetrationData.length;

    for (let i = -systems; i <= systems; i++) {
        const frequencyAbsolute = levelCounts[i + systems]; // Frequenza assoluta
        const frequencyRelative = frequencyAbsolute / totalAttackers; // Frequenza relativa

        // Disegna le barre dell'istogramma
        const startY = initialY - (i * (chartHeight / systems)); // Centralizza l'istogramma in Y

        ctx.beginPath();
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + frequencyRelative * (chartWidth / 2), startY); // Modifica per la lunghezza relativa
        ctx.strokeStyle = '#06c91b'; // Colore giallo per le barre
        ctx.lineWidth = 4; // Aumenta lo spessore delle barre
        ctx.stroke();
        ctx.closePath();
    }
}










// Funzione ricorsiva per calcolare la media
function computeAverage(scores, index = 0, sum = 0) {
    if (index >= scores.length) {
        return sum / scores.length; // Calcola e restituisce la media
    }
    
    sum += scores[index];
    
    return computeAverage(scores, index + 1, sum);
}
