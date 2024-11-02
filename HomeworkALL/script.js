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

//FUNZIONE RELATIVE HOMEWORK 2
function drawChartRelativeHMW2(attackers, systems, probability) {
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

//FUNZIONE HOMEWORK 3
function drawChartHMW3(attackers, systems, Lambda) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const marginX = 50;
    const marginY = 30;
    const chartWidth = canvas.width - marginX * 2;
    const chartHeight = canvas.height - marginY * 2;
    const maxScoreX = canvas.width - marginX - (chartWidth * 0.25); // Position of the red vertical line
    const xStep = (maxScoreX - marginX) / (systems - 1); // Distance between systems on the X-axis

    // Draw the axes
    ctx.beginPath();
    ctx.moveTo(marginX, marginY);
    ctx.lineTo(marginX, canvas.height - marginY); // Y-axis
    ctx.lineTo(canvas.width - marginX, canvas.height - marginY); // X-axis
    ctx.strokeStyle = '#007bff';
    ctx.stroke();
    ctx.closePath();

    // Draw X-axis labels as decimal values (e.g., 1/n)
    ctx.fillStyle = '#000'; // Label color
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Draw labels on X-axis
    for (let i = 0; i < systems; i++) {
        const value = ((i + 1) / systems).toFixed(2);
        const xLabelPos = marginX + (i * xStep);
        ctx.fillText(value, xLabelPos, canvas.height - marginY + 5); // Position the label below the X-axis
    }

    const penetrationData = [];
    const halfPenetrationData = new Array(Math.floor(systems / 2)).fill(0); // Array for n/2 penetration data

    // Simulate attacks and gather penetration scores
    for (let i = 0; i < attackers; i++) {
        ctx.beginPath();
        ctx.moveTo(marginX, canvas.height - marginY);
        let yPosition = 0;

        for (let j = 0; j < systems; j++) {
            const penetrated = Math.random() > (Lambda / systems);
            if (penetrated) {
                yPosition += 1;
            }

            const x = marginX + (j * xStep);
            const y = canvas.height - marginY - (yPosition * chartHeight / systems);
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsl(${(i / attackers) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Add final score for each attacker
        penetrationData.push(yPosition);

        // Count the penetration data for n/2
        if (yPosition > 0 && yPosition <= halfPenetrationData.length) {
            halfPenetrationData[yPosition - 1] += 1;
        }
    }

    // Draw the vertical red line for the last system
    ctx.beginPath();
    ctx.moveTo(maxScoreX, marginY);
    ctx.lineTo(maxScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ff5733';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Draw the vertical line for n/2
    const halfScoreX = marginX + Math.floor((systems / 2)) * xStep; // Position for n/2
    ctx.beginPath();
    ctx.moveTo(halfScoreX, marginY);
    ctx.lineTo(halfScoreX, canvas.height - marginY);
    ctx.strokeStyle = '#ffcc00'; // Different color for n/2 line
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Draw histogram for n/2 penetration data
    const totalAttackers = penetrationData.length;
    for (let i = 0; i < halfPenetrationData.length; i++) {
        const frequencyRelative = halfPenetrationData[i] / totalAttackers;

        // Calculate scale factor based on the number of attackers
        const scaleFactor = 1 + (attackers / 100);
        const lineWidth = Math.min(frequencyRelative * (canvas.width - halfScoreX - marginX) * scaleFactor, (canvas.width - halfScoreX - marginX));

        ctx.beginPath();
        const startY = canvas.height - marginY - (i * chartHeight / halfPenetrationData.length); // Aligns histogram with attackers' heights
        ctx.moveTo(halfScoreX, startY);
        ctx.lineTo(halfScoreX + lineWidth, startY);
        ctx.strokeStyle = '#007bff'; // Use the same color as the original histogram
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    // Draw histogram for the final system
    const levelCounts = new Array(systems).fill(0);
    penetrationData.forEach(penetration => {
        if (penetration > 0) {
            levelCounts[penetration - 1] += 1;
        }
    });

    // Draw histogram for the final system
    for (let i = 0; i < systems; i++) {
        const frequencyRelative = levelCounts[i] / totalAttackers;

        // Calculate scale factor based on the number of attackers
        const scaleFactor = 1 + (attackers / 100);
        const lineWidth = Math.min(frequencyRelative * (canvas.width - maxScoreX - marginX) * scaleFactor, (canvas.width - maxScoreX - marginX));

        ctx.beginPath();
        const startY = canvas.height - marginY - ((i + 1) * chartHeight / systems); // Y position for the final system
        ctx.moveTo(maxScoreX, startY);
        ctx.lineTo(maxScoreX + lineWidth, startY);
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







