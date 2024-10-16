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

//FUNZIONE PER GENERARE GRAFICO CON FREQUENZA ASSOLUTA!
function drawChartAbsolute(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50; 
    const marginY = 30; 
    const chartWidth = canvas.width - marginX * 2; 
    const chartHeight = canvas.height - marginY * 2; 
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25); 
    const xStep = (maxScoreX - marginX) / systems; 

    const initialY = canvas.height / 2; 

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

    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, initialY); 
        let yPosition = 0;

        for (let j = 0; j <= systems; j++) {
            const penetrated = Math.random() < probability;

            if (j === 0) {
                yPosition = 0; 
            } else if (penetrated) {
                yPosition += 1; 
            } else {
                yPosition -= 1; 
            }

            yPosition = Math.max(-systems, Math.min(systems, yPosition)); 
            const y = initialY - (yPosition * (chartHeight / (2 * systems))); 

            ctx.lineTo(marginX + (j * xStep), y);

            if(j === randomLineT) {
                penetrationDataTempoT.push(yPosition);
            }
        }

        ctx.strokeStyle = '#009dff96';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        penetrationData.push(yPosition);
    }


    // Calcolo media e varianza al tempo finale
    const mean = penetrationData.reduce((a, b) => a + b, 0) / penetrationData.length;
    const variance = penetrationData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / penetrationData.length;
    document.getElementById('meanInput').value = mean.toFixed(2);
    document.getElementById('varianceInput').value = variance.toFixed(2);

    // Calcolo media e varianza al tempo T
    const meanT = penetrationDataTempoT.reduce((a, b) => a + b, 0) / penetrationDataTempoT.length;
    const varianceT = penetrationDataTempoT.reduce((a, b) => a + Math.pow(b - meanT, 2), 0) / penetrationDataTempoT.length;  // Usare meanT
    document.getElementById('meanInputTimeT').value = meanT.toFixed(2);
    document.getElementById('varianceInputTimeT').value = varianceT.toFixed(2);


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


    // Disegna l'istogramma (rimane invariato)
    const totalLevels = 2 * systems; 
    const levelCounts = new Array(totalLevels).fill(0);

    penetrationData.forEach(penetration => {
        levelCounts[penetration + systems] += 1; 
    });

    const totalAttackers = penetrationData.length;

    for (let i = -systems; i <= systems; i++) {
        const frequencyAbsolute = levelCounts[i + systems]; 
        const frequencyRelative = frequencyAbsolute / totalAttackers; 

        const startY = initialY - (i * (chartHeight / (2 * systems))); 

        ctx.beginPath();
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + frequencyRelative * 300, startY); 
        ctx.strokeStyle = '#06c91b'; 
        ctx.lineWidth = 4; 
        ctx.stroke();
        ctx.closePath();
    }

    const levelCounts2 = new Array(systems * 2 + 1).fill(0); 

    penetrationDataTempoT.forEach(penetration => {
        levelCounts2[penetration + systems] += 1; 
    });

    for (let i = -systems; i <= systems; i++) {
        const frequencyAbsolute = levelCounts2[i + systems]; 
        const frequencyRelative = frequencyAbsolute / attackers; 

        const startY = initialY - (i * (chartHeight / (2 * systems))); 
        const lineLength = Math.max(frequencyRelative * 300, 1); 

        ctx.beginPath();
        ctx.moveTo(marginX + randomLineT * xStep, startY); 
        ctx.lineTo(marginX + randomLineT * xStep + lineLength, startY); 
        ctx.strokeStyle = '#06c91b'; 
        ctx.lineWidth = 4; 
        ctx.stroke();
        ctx.closePath();
    }
}

//FUNZIONE PER GENERARE GRAFICO CON FREQUENZA RELATIVA!
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

    // Disegna le etichette per l'asse Y
    ctx.fillStyle = '#000'; // Colore del testo
    ctx.font = '16px Arial'; // Font del testo
    ctx.fillText('1', marginX - 30, marginY + 5); // Etichetta in cima
    ctx.fillText('-1', marginX - 30, canvas.height - marginY); // Etichetta in fondo

    const randomLineT = Math.floor(systems / 2); // Tempo casuale
    const penetrationData = [];
    const penetrationDataTempoT = [];

    // Array di colori per le linee
    const colors = ['#009dff', '#ff5733', '#06c91b', '#ffcc00', '#c70039', '#900c3f', '#581845', '#34495e'];

    // Simula gli attacchi e raccoglie i punteggi di penetrazione
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, initialY); // Inizia dal basso del canvas
        let successes = 0; // Numero di sistemi manomessi con successo

        // Scegli un colore per la linea corrente
        const lineColor = colors[i % colors.length];
        ctx.strokeStyle = lineColor; // Applica il colore alla linea corrente

        for (let j = 1; j <= systems; j++) {
            const penetrated = Math.random() < probability;

            if (penetrated) {
                successes += 1;
            }

            const relativeScore = successes / j;
            const y = initialY - (relativeScore * chartHeight); // Posizione Y normalizzata

            if (j === randomLineT) {
                penetrationDataTempoT.push({ successes, y }); // Salva i successi e la posizione Y al tempo t
            }

            ctx.lineTo(marginX + ((j - 1) * xStep), y); // Sale verticalmente
            ctx.lineTo(marginX + (j * xStep), y); // Sposta orizzontalmente
        }

        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        penetrationData.push(successes);
    }

    // Calcola la media al tempo T
    let totalSuccessesAtT = 0;
    penetrationDataTempoT.forEach(penetration => {
        totalSuccessesAtT += penetration.successes;
    });

    const meanAtT = totalSuccessesAtT / penetrationDataTempoT.length;

    // Calcola la varianza al tempo T
    let varianceAtT = 0;
    penetrationDataTempoT.forEach(penetration => {
        varianceAtT += Math.pow(penetration.successes - meanAtT, 2);
    });

    varianceAtT = varianceAtT / penetrationDataTempoT.length;

    // Ora puoi stampare o usare i valori calcolati
    document.getElementById('meanInputTimeT').value = meanAtT;
    document.getElementById('varianceInputTimeT').value = varianceAtT;


    // Calcoli media e varianza al tempo N finale
    const mean = penetrationData.reduce((sum, val) => sum + val, 0) / attackers;
    const variance = penetrationData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / attackers;
    document.getElementById('meanInput').value = mean;
    document.getElementById('varianceInput').value = variance;
    
    // Disegna la linea verticale nel sistema T
    const randomSystemX = marginX + (randomLineT * xStep);
    ctx.beginPath();
    ctx.moveTo(randomSystemX, marginY);
    ctx.lineTo(randomSystemX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'istogramma orizzontale al tempo t, usando le posizioni Y allineate con le linee
    const totalAttackers = penetrationDataTempoT.length;
    const levelCountsAtT = new Array(systems + 1).fill(0); // Conta gli attaccanti che hanno avuto successo

    penetrationDataTempoT.forEach(penetration => {
        levelCountsAtT[penetration.successes] += 1;
    });

    for (let i = 0; i <= systems; i++) {
        const frequencyAbsolute = levelCountsAtT[i];
        const frequencyRelative = frequencyAbsolute / totalAttackers;

        // Trova l'altezza (y) corrispondente per ogni livello al tempo t
        const y = penetrationDataTempoT.find(penetration => penetration.successes === i)?.y;

        if (y !== undefined) {
            ctx.beginPath();
            ctx.moveTo(randomSystemX, y);
            ctx.lineTo(randomSystemX + frequencyRelative * (chartWidth / 2), y);
            ctx.strokeStyle = '#06c91b';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.closePath();
        }
    }

    // Disegna la linea verticale finale
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'istogramma finale (già presente nel codice)
    const totalLevels = 2 * systems;
    const levelCounts = new Array(totalLevels).fill(0);

    penetrationData.forEach(penetration => {
        levelCounts[penetration + systems] += 1; // Offset per consentire livelli negativi
    });

    for (let i = -systems; i <= systems; i++) {
        const frequencyAbsolute = levelCounts[i + systems];
        const frequencyRelative = frequencyAbsolute / totalAttackers;

        const startY = initialY - (i * (chartHeight / systems));

        ctx.beginPath();
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + frequencyRelative * (chartWidth / 2), startY);
        ctx.strokeStyle = '#06c91b';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    }
}







