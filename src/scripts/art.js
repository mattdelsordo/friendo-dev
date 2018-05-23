/**
 * Paints a dog on the canvas
 */
const DOG_HEIGHT = 41;
const DOG_WIDTH = 30;
let dogPoints;

// draws a dog's tail, where x and y are the bsae of the tail
const dogTail = function(g, x, y, angle) {
    g.save();
    g.translate(x, y);
    g.rotate(angle);
    g.fillRect(0, 0, 14, 4);
    g.restore();
}
// paints a single dog
const paintDog = function(g, x, y, tail = -0.6) {
    g.fillStyle = DOG_SKIN;
    g.strokeStyle = DOG_OUTLINE;
    drawOval(g, x-12,y-41,24,24,true); // head
    drawOval(g, x-15,y-31,30,30,true); // body
    dogTail(g, x+8, y-8, tail); // tail
    drawOval(g, x-13, y-5, 10, 5, true); // left foot
    drawOval(g, x+3, y-5, 10, 5, true); // right foot

    g.fillStyle = DOG_OUTLINE;
    // g.strokeStyle = DOG_OUTLINE;
    drawPolygon(g, [x-2,x+3,x], [y-27,y-27,y-24], true); // nose
    drawLine(g, x, y-24, x, y-22); // vertical mouth part
    drawLine(g, x-2, y-22, x+3, y-22); // horizontal mouth part
    drawOval(g, x-5, y-35, 3, 3, true); //left eye
    drawOval(g, x+2, y-35, 3, 3, true); // right eye
    drawOval(g, x-13, y-35, 5, 12, true); // left ear
    drawOval(g, x+9, y-35, 5, 12, true); // right ear

    drawHookMarker(g, x, y);
};
// adjusts the angle of a dog's tail based on the last draw
const newWagAngle = function() {
    return Math.random() * Math.PI / -5;
};
const wag = function() {
    for (let i = 0; i < MAX_DOGS; i += 1) dogPoints[i].angle = newWagAngle();
};
// paints a variable amount of dogs on the screen, based on 
const paintDogs = function(g, dogLevel) {
    // identify where the dogs aught to be drawn
    if (!dogPoints) {
        dogPoints = [];
        for (let i = 0; i < MAX_DOGS; i+=1) {
            dogPoints.push({
                x: Math.floor((Math.random() * (canvas.width  - DOG_WIDTH)) + DOG_WIDTH/2),
                y: Math.floor((Math.random() * (canvas.height * (3/5) - DOG_HEIGHT)) + DOG_HEIGHT + canvas.height*(2/5)),
                angle: newWagAngle(),
            });
        }
    } else {
        wag();
    }

    // draw dogs based on dog level
    if (dogLevel > 1) paintDog(g, dogPoints[0].x, dogPoints[0].y, dogPoints[0].angle);
    if (dogLevel > 3) paintDog(g, dogPoints[1].x, dogPoints[1].y, dogPoints[0].angle);
    if (dogLevel > 5) paintDog(g, dogPoints[2].x, dogPoints[2].y, dogPoints[0].angle);
    if (dogLevel > 7) paintDog(g, dogPoints[3].x, dogPoints[3].y, dogPoints[0].angle);
    if (dogLevel > 9) paintDog(g, dogPoints[4].x, dogPoints[4].y, dogPoints[0].angle);
}

// draws a single segment of a friendo's core from bottom center
const drawCoreSegment = function(g, x, y) {
    switch (friendoType) {
        case (ELEMENTS.EARTH):
            drawOutlinedRect(g, x - 25, y - 50, 50, 50);
            break;
        case (ELEMENTS.FIRE):
            drawOutlinedPolygon(g, [x, x-25, x+25], [y-43,y,y]);
            break;
        case (ELEMENTS.WATER):
            drawOutlinedOval(g, x-25, y-50, 50, 50);
            break;
        case (ELEMENTS.AIR):
            drawOutlinedPolygon(g, [x, x-25, x, x+25], [y-50, y-25, y, y-25],);
            break;
    }

    drawHookMarker(g, x, y);
};

// draws a single friendo eye from bottom center
const drawEye = function(g, x, y, doBlink) {
    if (doBlink) g.fillRect(x-5, y-1, 10, 2);
    else {
        // save fill color so that we can paint a full eye
        const fillPre = g.fillStyle;
        const strokePre = g.strokeStyle;
        g.fillStyle = strokePre;
        drawOval(g, x-5, y-10, 10, 10); // rim
        drawOval(g, x-3, y-8, 6, 6, true); // pupil
        g.fillStyle = fillPre;
    }

    drawHookMarker(g, x, y);
};

/**
 * Draw functions for various leg variants
 */
const drawFireLeftLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
        [x, x,              x-legGirth,         x,  x-(footLength/2),    x-footLength],
        [y, y-legHeight,    y-(legHeight/2),    y,  y-footHeight,       y],
        true);
}
const drawFireRightLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
        [x, x,              x+legGirth,         x,  x+(footLength/2),    x+footLength],
        [y, y-legHeight,    y-(legHeight/2),    y,  y-footHeight,       y],
        true);
}
const drawEarthLeftLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
        [x+(legGirth/2),    x+(legGirth/2), x-(legGirth/2), x-(legGirth/2), x-footLength,   x-footLength],
        [y,                 y-legHeight,    y-legHeight,    y-footHeight,   y-footHeight,   y],
        true);
}
const drawEarthRightLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
        [x-(legGirth/2),    x-(legGirth/2), x+(legGirth/2), x+(legGirth/2), x+footLength,   x+footLength],
        [y,                 y-legHeight,    y-legHeight,    y-footHeight,   y-footHeight,   y],
        true);
}
const drawWaterLeftLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedOval(g, x-footLength, y-footHeight, footLength, footHeight);
    drawOutlinedOval(g, x-(legGirth/2), y-legHeight, legGirth, legHeight);
    drawOval(g, x-footLength+1, y-footHeight+1, footLength-4, footHeight-3, true);
}
const drawWaterRightLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedOval(g, x, y-footHeight, footLength, footHeight);
    drawOutlinedOval(g, x-(legGirth/2), y-legHeight, legGirth, legHeight);
    drawOval(g, x+1, y-footHeight+1, footLength-4, footHeight-4, true);
}
const drawAirLeftLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
        [x, x+(legGirth/2),  x,           x-(legGirth/2),  x, x-(legGirth/4), x-(legGirth/4)-(footLength/4), x-(legGirth/4)-(footLength/2), x-(legGirth/4)-(footLength/4),x-(legGirth/4)],
        [y, y-(legHeight/2), y-legHeight, y-(legHeight/2), y, y-footHeight,     y-footHeight, y, y, y-footHeight],
        true);
}
const drawAirRightLeg = function(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
        [x, x-(legGirth/2),  x,           x+(legGirth/2),  x, x+(legGirth/4), x+(legGirth/4)+(footLength/4), x+(legGirth/4)+(footLength/2), x+(legGirth/4)+(footLength/4),x+(legGirth/4)],
        [y, y-(legHeight/2), y-legHeight, y-(legHeight/2), y, y-footHeight,     y-footHeight, y, y, y-footHeight],
        true);
}

/**
 * Functions that draw hair
 */
// handles bang swoop thing
const drawLusciousHairFront = function(g, x, y, level) {
    // set hair color to friendo outline color
    const oldFill = g.fillStyle;
    g.fillStyle = g.strokeStyle;

    // g.fillStyle = 'violet';
    g.beginPath();
    g.moveTo(x+8, y-4);
    g.quadraticCurveTo(x+4, y+22, x-30, y+30);
    g.lineTo(x-26, y-1);
    g.closePath();
    g.fill();

    // revert colors
    g.fillStyle = oldFill;
}
// back of the hair
const drawLusciousHairBack = function(g, x, y, level) {
    // set hair color to friendo outline color
    const oldFill = g.fillStyle;
    g.fillStyle = g.strokeStyle;

    const hairFactor = Math.ceil(level * 8.5);
    const halfHairFactor = (hairFactor/2);
    drawOval(g, x-halfHairFactor, y-halfHairFactor, hairFactor, hairFactor, true);
    // g.fillStyle = 'violet';
    g.beginPath();
    g.moveTo(x-halfHairFactor, y);
    g.quadraticCurveTo(x-30, y+50,x-halfHairFactor-10, y+40);
    g.quadraticCurveTo(x-20, y+70,x, y+30);
    g.quadraticCurveTo(x+20, y+70,x+halfHairFactor+10, y+40);
    g.quadraticCurveTo(x+30, y+50,x+halfHairFactor, y);
    g.closePath();
    g.fill();

    // revert colors
    g.fillStyle = oldFill;
}
const drawStevenHair = function(g, x, y, level) {
    // set hair color to friendo outline color
    const oldFill = g.fillStyle;
    g.fillStyle = g.strokeStyle;

    // calculate oval size
    const curlSize = level * 4;
    const curls = [
        [x-(curlSize/2)-8,    y-curlSize+4],
        [x-(curlSize/2)+12,    y-curlSize + 14],
        [x-(curlSize/2)+8,    y-curlSize+2],
        [x-(curlSize/2)-10,    y-curlSize+17],
        [x-(curlSize/2)+9,    y-curlSize+18],
        [x-(curlSize/2)-2,    y-curlSize],
    ];
    drawOval(g, curls[0][0], curls[0][1], curlSize, curlSize, true);
    drawOval(g, curls[1][0], curls[1][1], curlSize, curlSize, true);
    drawOval(g, curls[2][0], curls[2][1], curlSize, curlSize, true);
    drawOval(g, curls[3][0], curls[3][1], curlSize, curlSize, true);
    drawOval(g, curls[4][0], curls[4][1], curlSize, curlSize, true);
     // this one just fills gaps in the middle of the design
    // g.fillStyle = 'violet';
    drawOval(g, curls[5][0], curls[5][1], curlSize+5, curlSize+5, true);

    // revert colors
    g.fillStyle = oldFill;
}
const drawDiglettHair = function (g, x, y, level) {
    const xOffset = 4 + (level*1.5);
    const yOffset = 5 + (level*2);
    drawLine(g, x, y, x, y - yOffset);
    drawLine(g, x, y, x - xOffset, y - yOffset);
    drawLine(g, x, y, x + xOffset, y - yOffset);
}

/**
 * Arm drawing methods
 * Anchored at shoulder
 */
const drawEarthArm = function(g, x, y, w, h) {
    drawOutlinedRect(g, x, y, w, h);
}
const drawWaterArm = function(g, x, y, w, h) {
    drawOutlinedOval(g, x, y, w, h);
}
const drawAirArm = function(g, x, y, w, h) {
    drawOutlinedPolygon(g,
        [x, x-(w/2), x, x+(w/2)],
        [y, y+(h/2), y+h, y+(h/2)],
        true);
}
const drawFireArm = function(g, x, y, w, h) {
    drawOutlinedPolygon(g,
        [x, x-(w/2), x,],
        [y, y+(h/2), y+h,],
        true);
}