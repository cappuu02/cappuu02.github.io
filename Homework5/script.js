const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const margin = 60; // Margin around canvas for axes

function drawAxes() {
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // Draw X-axis
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.stroke();

    // Draw Y-axis
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();

    // Labels for axes
    ctx.font = "16px Arial";
    ctx.fillStyle = 'black'; // Changed color for axis labels
    ctx.fillText("X", width - margin + 20, height - margin);
    ctx.fillText("Y", margin + 20, margin);

    // Draw tick marks and labels on X-axis
    for (let i = 0; i <= 10; i++) {
        const x = margin + i * ((width - 2 * margin) / 10);
        ctx.beginPath();
        ctx.moveTo(x, height - margin - 5);
        ctx.lineTo(x, height - margin + 5);
        ctx.stroke();
        ctx.fillText(i, x - 5, height - margin + 20);
    }

    // Draw tick marks and labels on Y-axis
    for (let i = 0; i <= 10; i++) {
        const y = height - margin - i * ((height - 2 * margin) / 10);
        ctx.beginPath();
        ctx.moveTo(margin - 5, y);
        ctx.lineTo(margin + 5, y);
        ctx.stroke();
        ctx.fillText(i, margin - 25, y + 5);
    }
}

function simulate() {
    const numPoints = parseInt(document.getElementById('numPoints').value);
    const width = canvas.width - 2 * margin;
    const height = canvas.height - 2 * margin;

    drawAxes();

    // Generate random points within the defined axis limits
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * 10; // X between 0 and 10
        const y = 0.5 * x + (Math.random() - 0.5) * 2; // Y related to X with some noise
        points.push({ x, y });
    }

    // Calculate regression line
    const { slope, intercept } = linearRegression(points);

    // Plot points
    ctx.fillStyle = 'green'; // Changed color for points
    points.forEach(point => {
        const px = margin + (point.x / 10) * width;
        const py = canvas.height - margin - (point.y / 10) * height;
        if (px >= margin && px <= canvas.width - margin && py >= margin && py <= canvas.height - margin) {
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    });

    // Draw regression line
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin - (intercept / 10) * height);
    ctx.lineTo(margin + width, canvas.height - margin - ((slope * 10 + intercept) / 10) * height);
    ctx.stroke();
}

function linearRegression(points) {
    const n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

    points.forEach(({ x, y }) => {
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}
