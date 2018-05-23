// draws a rectangle with an outline on top of it
export const drawOutlinedRect = (g, x, y, w, h) => {
    g.fillRect(x, y, w, h);
    g.strokeRect(x, y, w, h);
}

// draws an arbitrary polygon based on a set of x and y coordinates
export const drawPolygon = (g, xs, ys, fill) => {
    g.beginPath();
    g.moveTo(xs[0], ys[0]);
    for (let i = 1; i < xs.length && i < ys.length; i += 1) g.lineTo(xs[i], ys[i]);
    g.closePath();
    if (fill) g.fill();
    else g.stroke();
};
export const drawOutlinedPolygon = (g, xs, ys) => {
    drawPolygon(g, xs, ys, true);
    drawPolygon(g, xs, ys);
}

// draws an oval based on the upper left corner of the enclosing rectangle
export const drawOval = (g, x, y, width, height, fill) => {
    if (width < 0 || height < 0) return; // catch error from trying to draw too small of an ellipse
    g.beginPath();
    g.ellipse(x+(width/2), y+(height/2), width/2, height/2, 0, 0, Math.PI*2);
    g.closePath();
    if (fill) g.fill();
    else g.stroke();


};
export const drawOutlinedOval = (g, x, y, w, h) => {
    drawOval(g, x, y, w, h, true);
    drawOval(g, x, y, w, h);
}
 
// draws an arbitrary line
export const drawLine = (g, x1, y1, x2, y2) => {
    g.beginPath();
    g.moveTo(x1, y1);
    g.lineTo(x2, y2);
    g.stroke();
};

// for debugging, mark all spots where elements are anchored
let showHooks = false;
export const toggleHookMarkers = () => {
    showHooks = !showHooks
    saveGame()
};
export const drawHookMarker = (g, x, y) => {
    if (showHooks) {
        const oldStrokeStyle = g.strokeStyle;
        const oldFillStyle = g.fillStyle;
        g.strokeStyle = 'green';
        g.fillStyle = 'yellow';
        drawOval(g, x-1, y-1, 3, 3);
        drawOval(g, x-1, y-1, 3, 3, true);
        g.strokeStyle = oldStrokeStyle;
        g.fillStyle = oldFillStyle;
    }
};