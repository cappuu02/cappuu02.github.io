document.getElementById('chartType').addEventListener('change', function() {
    const chartType = this.value;
    const probabilityContainer = document.getElementById('probabilityContainer');
    const lambdaContainer = document.getElementById('lambdaContainer');

    if (chartType === 'Poisson') {
        probabilityContainer.style.display = 'none'; // Nascondi il campo probabilità
        lambdaContainer.style.display = 'block'; // Mostra il campo Lambda
    } else {
        probabilityContainer.style.display = 'block'; // Mostra il campo probabilità
        lambdaContainer.style.display = 'none'; // Nascondi il campo Lambda
    }
});



document.getElementById('submitButton').addEventListener('click', function() {
    const attackersValue = parseInt(document.getElementById('attackers').value);
    const systemValue = parseInt(document.getElementById('servers').value);
    const probability = parseFloat(document.getElementById('probability').value);
    const Lambda = parseFloat(document.getElementById('Lambda').value);
    const chartType = document.getElementById('chartType').value; // Ottieni il valore selezionato nel menu a discesa

    if (chartType === 'Absolute [Success: 1 - Failure: 0]') {
        drawChartHMW1(attackersValue, systemValue, probability);
    } else if (chartType === 'Brownian') {
        drawChart(attackersValue, systemValue, probability);
    } else if (chartType === 'Poisson') {
        drawChartHMW3(attackersValue, systemValue, Lambda);
    }  else if (chartType === 'Absolute [Success: 1 - Failure: -1]') {
        drawChartAbsoluteHMW2(attackersValue, systemValue, probability);
    }  else if (chartType === 'Relative') {
        drawChartRelativeHMW2(attackersValue, systemValue, probability);
    }  
    
});

//FUNZIONE ABSOLUTE ONLY SUCCESS HOMEWORK 1
function drawChartHMW1(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50;
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2;
    const chartHeight = canvas.height - marginY * 2;
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25);
    const xStep = (maxScoreX - marginX) / (systems - 1);

    // Draw the axes
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY);
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    const penetrationData = [];

    // Simulate attacks and gather penetration scores
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, canvas.height - marginY);
        let yPosition = 0;

        for (let j = 0; j < systems; j++) {
            const penetrated = Math.random() > probability;

            if (penetrated) {
                yPosition += 1;
            }

            const x = marginX + (j * xStep);
            const y = canvas.height - marginY - (yPosition * chartHeight / systems);
            ctx.lineTo(x, y);

            if (i === 0) {
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText(`${j + 1}`, x - 10, canvas.height - 10);
            }
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Add the final score for each attacker
        penetrationData.push(yPosition);
    }

    // Add the average calculation after the loop
    const averagePenetrationScore = computeAverage(penetrationData);

    // Update the average in the HTML
    document.getElementById('averageInput').innerText = averagePenetrationScore.toFixed(2);

    // Draw the vertical line
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    const levelCounts = new Array(systems).fill(0);
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration - 1] += 1;
        }
    });

    const totalAttackers = penetrationData.length;

    // Draw the histogram
    for (let i = 0; i < systems; i++) {
        const frequencyRelative = levelCounts[i] / totalAttackers;

        // Calculate a scaling factor based on the number of attackers
        const scaleFactor = 1 + (attackers / 100); // You can adjust the denominator to modify the effect
        const lineWidth = Math.min(frequencyRelative * (canvas.width - maxScoreX - marginX) * scaleFactor, (canvas.width - maxScoreX - marginX));

        ctx.beginPath();
        const startY = canvas.height - marginY - ((i + 1) * chartHeight / systems);
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + lineWidth, startY);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();    
    }
}

//FUNZIONE AVERAGE HOMEWORK 1
function computeAverage(scores, index = 0, sum = 0) {
    // Exit condition
    if (index >= scores.length) {
        return sum / scores.length; // Calculate and return the average
    }
    
    // Accumulate the current score
    sum += scores[index];
    
    // Recursively call the function with the next index
    return computeAverage(scores, index + 1, sum);
}
//----------------------------

//FUNZIONE ABSOLUTE WITH FAILURE HOMEWORK 2
function drawChartAbsoluteHMW2(attackers, systems, probability) {
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


function drawChartHMW3(attackers, systems, Lambda) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50;
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2;
    const chartHeight = canvas.height - marginY * 2;
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25); // Posizione della linea verticale finale
    const xStep = (maxScoreX - marginX) / (systems - 1); // Distanza tra i sistemi sull'asse X

    // Disegna gli assi
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY); // Asse Y
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY); // Asse X
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    // Disegna le etichette sull'asse X
    ctx.fillStyle = '#000'; // Colore delle etichette
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < systems; i++) {
        const value = ((i + 1) / systems).toFixed(2);
        const xLabelPos = marginX + (i * xStep);
        ctx.fillText(value, xLabelPos, canvas.height - marginY + 5);
    }

    const penetrationData = [];
    const halfPenetrationData = new Array((systems / 2)).fill(0);
    const attackerHeights = Array.from({ length: systems }, () => []); // Array per memorizzare le altezze di ogni livello di penetrazione
    const exactHeightsAtHalf = []; // Array per memorizzare le altezze esatte al tempo n/2

    // Simula attacchi e raccogli punteggi di penetrazione
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, canvas.height - marginY);
        let yPosition = 0;

        // Inizia dal sistema 1 invece di 0
        for (let j = 1; j < systems; j++) {
            const penetrated = Math.random() > (Lambda / systems);
            if (penetrated) {
                yPosition += 1;
            }

            const x = marginX + (j * xStep);
            const y = canvas.height - marginY - (yPosition * chartHeight / systems);
            ctx.lineTo(x, y);

            // Memorizza la posizione y per ogni livello di penetrazione
            if (yPosition > 0 && yPosition <= attackerHeights.length) {
                attackerHeights[yPosition - 1].push(y);
            }
        }

        ctx.strokeStyle = `red`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Aggiungi punteggio finale per ogni attaccante
        penetrationData.push(yPosition);

        // Contare i dati di penetrazione per n/2
        if (yPosition > 0 && yPosition <= halfPenetrationData.length) {
            halfPenetrationData[yPosition - 1] += 1;

            // Salva l'altezza esatta raggiunta al tempo n/2
            const halfYPosition = attackerHeights[yPosition - 1][halfPenetrationData[yPosition - 1] - 1];
            exactHeightsAtHalf.push(halfYPosition);
        }
    }

    // Disegna la linea verticale rossa per l'ultimo sistema
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna la linea verticale per n/2
    const halfScoreX = marginX + Math.floor((systems / 2)) * xStep;
    ctx.beginPath();
    ctx.moveTo(halfScoreX, marginY);
    ctx.lineTo(halfScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'istogramma per i dati di penetrazione n/2
    const totalAttackers = penetrationData.length;
    for (let i = 0; i < halfPenetrationData.length; i++) {
        const frequencyRelative = halfPenetrationData[i] / totalAttackers;

        // Usa le altezze esatte per allineare le barre
        const exactHeight = exactHeightsAtHalf[i];

        // Calcola il fattore di scala e la larghezza per la barra dell'istogramma
        const scaleFactor = 1 + (attackers / 100);
        const lineWidth = Math.min(frequencyRelative * (canvas.width - halfScoreX - marginX) * scaleFactor, (canvas.width - halfScoreX - marginX));

        // Disegna l'istogramma, allineato con l'altezza esatta
        ctx.beginPath();
        ctx.moveTo(halfScoreX, exactHeight); // Inizia dalla linea dell'attaccante
        ctx.lineTo(halfScoreX + lineWidth, exactHeight);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    // Disegna l'istogramma per l'ultimo sistema
    const levelCounts = new Array(systems).fill(0);
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration - 1] += 1;
        }
    });

    // Disegna l'istogramma per l'ultimo sistema allineato con le linee degli attaccanti
    for (let i = 0; i < systems; i++) {
        const frequencyRelative = levelCounts[i] / totalAttackers;

        // Usa le altezze esatte per allineare le barre
        const exactHeight = attackerHeights[i].length > 0 ? attackerHeights[i][attackerHeights[i].length - 1] : canvas.height - marginY;

        // Calcola la larghezza per la barra dell'istogramma
        const lineWidth = Math.min(frequencyRelative * (canvas.width - maxScoreX - marginX), (canvas.width - maxScoreX - marginX));

        // Disegna l'istogramma, allineato con l'altezza esatta
        ctx.beginPath();
        ctx.moveTo(maxScoreX, exactHeight); // Inizia dalla linea dell'attaccante
        ctx.lineTo(maxScoreX + lineWidth, exactHeight);
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
}



//----------------------------

//FUNZIONE HOMEWORK 4
function drawChart(attackers, systems, probability) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50; // Margine per l'asse y
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2; // Larghezza totale del grafico
    const chartHeight = canvas.height - marginY * 2;

    const yCenter = canvas.height / 2; // Centro verticale del canvas
    const xStep = chartWidth / (systems - 1); // Passo per l'asse x
    const jumpSize = 1 / Math.sqrt(systems); // Salto in base alla radice quadrata di n
    const yMax = Math.sqrt(systems); // Nuovo valore massimo dell'asse Y
    const yStep = chartHeight / (2 * yMax); // Scala verticale basata su +/-sqrt(systems)

    const midIndex = Math.floor(systems / 2); // Punto a metà del percorso
    const midPenetrationData = []; // Dati per i livelli a n/2
    const finalPenetrationData = []; // Dati per i livelli a n

    // Disegna l'asse y principale
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY);
    ctx.strokeStyle = '#000'; // Colore nero per l'asse y
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Disegna l'asse x principale
    ctx.beginPath();
    ctx.moveTo(marginX, yCenter);
    ctx.lineTo(marginX + chartWidth, yCenter);
    ctx.strokeStyle = '#000'; // Colore nero per l'asse x
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Etichetta del valore massimo su Y (+sqrt(systems))
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.fillText(`+${yMax.toFixed(2)}`, marginX - 10, marginY + 5);

    // Etichetta del valore minimo su Y (-sqrt(systems))
    ctx.fillText(`-${yMax.toFixed(2)}`, marginX - 10, canvas.height - marginY - 5);

    // Simula gli attacchi e traccia le linee per ciascun attaccante
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, yCenter); // Inizia dal livello 0 al centro

        let yPosition = 0;
        let midPosition = 0;

        for (let j = 0; j < systems; j++) {
            if (j > 0) {
                const jump = (Math.random() < probability) ? jumpSize : -jumpSize;
                yPosition += jump;

                yPosition = Math.max(-yMax, Math.min(yPosition, yMax));
            }

            const x = marginX + (j * xStep);
            const y = yCenter - (yPosition * yStep);

            if (j === midIndex) {
                midPosition = yPosition;
            }

            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.closePath();

        midPenetrationData.push(midPosition);
        finalPenetrationData.push(yPosition);
    }

    // Linee verticali di riferimento: linea verde a metà e linea rossa alla fine
    const midLineX = marginX + (midIndex * xStep);
    ctx.beginPath();
    ctx.moveTo(midLineX, marginY);
    ctx.lineTo(midLineX, canvas.height - marginY);
    ctx.strokeStyle = '#33ff57'; // Verde per la linea centrale
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    const maxScoreX = marginX + chartWidth;
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733'; // Rosso per la linea finale
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Funzione per disegnare l'istogramma basato solo sui livelli continui raggiunti dagli attaccanti
    function drawHistogram(data, startX) {
        const frequencyMap = {};

        // Calcola le frequenze senza alcun arrotondamento, considerando i valori continui
        for (let i = 0; i < data.length; i++) {
            const level = data[i];
            frequencyMap[level] = (frequencyMap[level] || 0) + 1;
        }

        const maxFrequency = Math.max(...Object.values(frequencyMap)); // Frequenza massima per calcolare la lunghezza relativa delle barre

        // Disegna le linee orizzontali dell'istogramma basandosi sui livelli continui degli attaccanti
        for (let level in frequencyMap) {
            const freq = frequencyMap[level];
            const y = yCenter - (parseFloat(level) * yStep); // Usa il valore continuo di 'level' per il calcolo di y

            // Calcola la lunghezza della barra in base alla frequenza relativa
            const barLength = (freq / maxFrequency) * 100; // Lunghezza relativa massima di 100 pixel

            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(startX + barLength, y);
            ctx.strokeStyle = '#0000FF'; // Colore blu per le barre dell'istogramma
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }
    }

    // Disegna l'istogramma per la metà (n/2) sulla linea verde
    drawHistogram(midPenetrationData, midLineX);

    // Disegna l'istogramma per la fine (n) sulla linea rossa!!
    drawHistogram(finalPenetrationData, maxScoreX);
}
//--------------------







