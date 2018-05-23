/**
 * Friendo statistics.
 * Initialized to default values.
 */
// let friendoName = "Friendtholemew";
// let ownerName = "Mrot";
// let friendoType = ELEMENTS.EARTH;

// let statLevel = {
//     [STATS.CORE]: 1,
//     [STATS.LEG]: 0,
//     [STATS.ARM]: 0,
//     [STATS.SIGHT]: 1,
//     [STATS.HAIR]: 0,
//     [STATS.TASTE]: 1,
//     [STATS.DOG]: 0,
//     [STATS.MEME]: 1,
// };
let statExp = [];
let energy = 100;
let energy_max;
let level = 1;
let isBlinking = false;

// hooks are used to hang body parts from the friendo
// these are re-calculated on every stat update
// default hooks are for body parts at their default value
let mainHook = {x: 200, y: 350};
let rightLegHook;
let leftLegHook;
let rightArmHook;
let leftArmHook;

// const setStat = function(stat, val) {
//     statLevel[stat] = val;
// }

// // converts this ""object"" to JSON, for saving
// const friendoToJSONString = function() {
//     const toJson = {
//         friendoName,
//         ownerName,
//         stats: statLevel,
//         showHooks,
//         friendoType,
//     };
//
//     return JSON.stringify(toJson);
// };
//
// // loads friendo from JSON
// const friendoFromJSONString = function(friendoJson) {
//     const fromJson = JSON.parse(friendoJson);
//     statLevel = fromJson.stats;
//     showHooks = fromJson.showHooks;
//     ownerName = fromJson.ownerName;
//     friendoName = fromJson.friendoName;
//     friendoType = fromJson.friendoType;
// };

// sets colors based on friendo element
// const setColors = function(g) {
//     switch (friendoType) {
//         case (ELEMENTS.EARTH):
//             g.fillStyle = EARTH_SKIN;
//             g.strokeStyle = EARTH_OUTLINE;
//             break;
//         case (ELEMENTS.FIRE):
//             g.fillStyle = FIRE_SKIN;
//             g.strokeStyle = FIRE_OUTLINE;
//             break;
//         case (ELEMENTS.WATER):
//             g.fillStyle = WATER_SKIN;
//             g.strokeStyle = WATER_OUTLINE;
//             break;
//         case (ELEMENTS.AIR):
//             g.fillStyle = AIR_SKIN;
//             g.strokeStyle = AIR_OUTLINE;
//             break;
//     }
// };

// draws the friendo on the screen
const drawFriendo = function(g, x = mainHook.x, y = mainHook.y) {
    paintDogs(g, statLevel[STATS.DOG]);

    setColors(g);

    // get body height from core
    const legHeight = drawLegs(g, x, y);
    drawArms(g, x, y-legHeight);
    drawCore(g, x, y-legHeight);

    // draw master hook marker for reference
    drawHookMarker(g, x, y);
}

//draws all eyes based off eye level
const drawEyes = function(g, x, y, doBlink) {
    if (statLevel[STATS.SIGHT] > 6) {
        // lvl 7 and up, 3 eyes
        // fire types are a special case
        if (friendoType === ELEMENTS.FIRE) {
            drawEye(g, x, y-6, doBlink);
            drawEye(g, x-6, y+4, doBlink);
            drawEye(g, x+6, y+4, doBlink);
        } else {
            drawEye(g, x, y-8, doBlink);
            drawEye(g, x-8, y, doBlink);
            drawEye(g, x+8, y, doBlink);
        }
    } else if (statLevel[STATS.SIGHT] > 3) {
        // lvl 4 and up, 2 eyes
        // eyes must be moved down if a fire element
        if (friendoType === ELEMENTS.FIRE) {
            drawEye(g, x-6, y+4, doBlink);
            drawEye(g, x+6, y+4, doBlink);
        } else {
            drawEye(g, x-8, y, doBlink);
            drawEye(g, x+8, y, doBlink);
        }
    } else {
        // default = 1 eye
        drawEye(g, x, y, doBlink);
    }

    drawHookMarker(g, x, y);
}

// face is drawn relative to itself
const drawFace = function(g, x, y) {
    // if the friendo is a fire element, the face needs to be drawn
    // farther down to fit in the core segment
    if (friendoType === ELEMENTS.FIRE) y += 6;

    drawLine(g, x-5, y, x+5, y); // mouth
    drawLine(g, x-1, y-11, x-1, y-4); // vertical nose
    drawLine(g, x-2, y-4, x+3, y-4); // horizontal nose
    drawEyes(g, x, y - 14, isBlinking);

    drawHookMarker(g, x, y);
}

// draw friendo torso based off 'core' level
// special cases are DISGUSTING
// TODO: refactor this into a ELEMENT class
const drawCore = function(g, x, y) {
    if (statLevel[STATS.CORE] > 8) {
        // 5-6 segments

        if (friendoType === ELEMENTS.EARTH) {
            drawHeadSegment(g, x, y-150);
            drawCoreSegment(g, x-50, y-100);
            drawCoreSegment(g, x+50, y-100);
            drawCoreSegment(g, x, y-100);
            drawCoreSegment(g, x, y-50);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.WATER) {
            //drawHeadSegment(g, x, y-150);
            drawHeadSegment(g, x, y-100);
            drawCoreSegment(g, x-44, y-75);
            drawCoreSegment(g, x+44, y-75);
            drawCoreSegment(g, x, y-50);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.AIR) {
            // drawHeadSegment(g, x, y-150);
            // drawCoreSegment(g, x-50, y-100);
            // drawCoreSegment(g, x+50, y-100);
            // drawCoreSegment(g, x, y-100);

            drawHeadSegment(g, x, y-120);
            drawCoreSegment(g, x-30, y-90);
            drawCoreSegment(g, x+30, y-90);
            drawCoreSegment(g, x, y-60);
            drawCoreSegment(g, x-30, y-30);
            drawCoreSegment(g, x+30, y-30);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.FIRE) {
            drawHeadSegment(g, x, y-86);

            g.save();
            g.translate(x, y-86);
            g.rotate(Math.PI);
            drawCoreSegment(g, 25, 0);
            drawCoreSegment(g, -24, 0);
            g.restore();

            drawCoreSegment(g, x-25, y);
            drawCoreSegment(g, x+25, y);
        }
    } else if (statLevel[STATS.CORE] > 6) {
        // 4 segments
        if (friendoType === ELEMENTS.EARTH) {
            drawHeadSegment(g, x, y-100);
            drawCoreSegment(g, x-25, y-50);
            drawCoreSegment(g, x+25, y-50);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.WATER) {
            drawHeadSegment(g, x, y-88);
            drawCoreSegment(g, x-25, y-44);
            drawCoreSegment(g, x+25, y-44);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.AIR) {
            drawHeadSegment(g, x, y-60);
            drawCoreSegment(g, x-30, y-30);
            drawCoreSegment(g, x+30, y-30);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.FIRE) {
            y += 20; // this line is cancer
            drawHeadSegment(g, x, y-86);

            g.save();
            g.translate(x-25, y-86);
            g.rotate(Math.PI);
            drawCoreSegment(g, 0, 0);
            g.restore();

            g.save();
            g.translate(x+25, y-86);
            g.rotate(Math.PI);
            drawCoreSegment(g, 0, 0);
            g.restore();

            //drawCoreSegment(g, x, y-43);

            g.save();
            g.translate(x, y-43);
            g.rotate(Math.PI);
            drawCoreSegment(g, 0, 0);
            g.restore();
        }
    } else if (statLevel[STATS.CORE] > 4) {
        // 3 segments
        if (friendoType === ELEMENTS.EARTH) {
            drawHeadSegment(g, x, y-100);
            drawCoreSegment(g, x, y-50);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.WATER) {
            drawHeadSegment(g, x-25, y-44);
            drawCoreSegment(g, x+25, y-44);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.AIR) {
            y += 4;
            drawHeadSegment(g, x, y-30);
            drawCoreSegment(g, x+30, y);
            drawCoreSegment(g, x-30, y);
        } else if (friendoType === ELEMENTS.FIRE) {
            drawHeadSegment(g, x, y-43);
            drawCoreSegment(g, x-25, y);
            drawCoreSegment(g, x+25, y);
        }
    } else if (statLevel[STATS.CORE] > 2) {
        // 2 segments
        if (friendoType === ELEMENTS.EARTH) {
            drawHeadSegment(g, x, y-50);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.WATER) {
            drawHeadSegment(g, x, y-50);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.AIR) {
            drawHeadSegment(g, x-30, y-30);
            drawCoreSegment(g, x, y);
        } else if (friendoType === ELEMENTS.FIRE) {
            y += 20;
            drawHeadSegment(g, x, y-43);

            g.save();
            g.translate(x, y-43);
            g.rotate(Math.PI);
            drawCoreSegment(g, 0, 0);
            g.restore();
        }
    } else {
        // 1 segment
        drawHeadSegment(g, x, y);
    }
};
// helper to draw specifically the face core
const drawHeadSegment = function(g, x, y) {
    let hairOffset = 50;
    // as always, fireboy is a special case
    if (friendoType === ELEMENTS.FIRE) hairOffset = 42;

    drawBackHair(g, x, y-hairOffset); // back hair on top of head core
    drawCoreSegment(g,x,y); // head core
    drawFace(g, x, y - 12); // face relative to head core
    drawFrontHair(g, x, y-hairOffset); // front hair on top of head core

    drawHookMarker(g, x, y);
}

// draw legs based off leg stat
const drawLegs = function(g, x, y) {
    if (statLevel[STATS.LEG] > 0) {
        /**
         * Parameters for drawing the legs
         * These values are complete nonsense I just fiddled till it looked like it scaled good
         */
        const legGirth = statLevel[STATS.LEG] * 2; // thiccness of leg
        const legHeight = ((statLevel[STATS.LEG] - 1) * 6) + 10; // length of leg
        const footLength = Math.floor(legGirth * 1.3) + 3;
        const footHeight = legHeight / 4;

        // gap between legs
        let thighGap = 13;

        // draw element of leg based on element of friendo
        // return the height at which to draw the body
        switch (friendoType) {
            case ELEMENTS.EARTH:
                drawEarthLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight);
                drawEarthRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight);
                return legHeight;
            case ELEMENTS.WATER:
                drawWaterLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight);
                drawWaterRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight);
                return legHeight-8;
            case ELEMENTS.AIR:
                drawAirLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight);
                drawAirRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight);
                return legHeight;
            case ELEMENTS.FIRE:
                drawFireLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight);
                drawFireRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight);
                return legHeight;
        }

        drawHookMarker(g, x, y);

        // return leg height to calculate core height
        return legHeight;
    }
    // no legs, draw body just on the floor or whatever
    return 0;
};

// hair that gets painted behind the head segment
const drawBackHair = function (g, x, y) {
    g.save();
    // hair needs to be at the back of EVERYTHING
    // this draws it to the 'underside' of the canvas
    g.globalCompositeOperation = 'destination-over';
    if (statLevel[STATS.HAIR] > 7) drawLusciousHairBack(g, x, y, statLevel[STATS.HAIR]);
    else if (statLevel[STATS.HAIR]  > 3) drawStevenHair(g, x, y, statLevel[STATS.HAIR]);
    g.restore();
    drawHookMarker(g, x, y);
}

// hair that gets painted in front of the head segment
const drawFrontHair = function (g, x, y) {
    if (statLevel[STATS.HAIR] > 7) drawLusciousHairFront(g, x, y, statLevel[STATS.HAIR]);
    else if (statLevel[STATS.HAIR] > 0 && statLevel[STATS.HAIR]  < 4) drawDiglettHair(g, x, y, statLevel[STATS.HAIR]);

    drawHookMarker(g, x, y);
}

// compute where arms should be tethered
// this function is the literal worst thing ive written so far
const computeArmTethers = function () {
    if (statLevel[STATS.CORE] > 8) {
        switch (friendoType) {
            case ELEMENTS.EARTH:
            return {
                xOffset: 75,
                yOffset: -135,
            };
        case ELEMENTS.WATER:
            return {
                xOffset: 60,
                yOffset: -90,
            };
        case ELEMENTS.AIR:
            return {
                xOffset: 56,
                yOffset: -100,
            };
        case ELEMENTS.FIRE:
            return {
                xOffset: 42,
                yOffset: -70,
            };
        }
    } else if (statLevel[STATS.CORE] > 6) {
        switch (friendoType) {
            case ELEMENTS.EARTH:
            return {
                xOffset: 50,
                yOffset: -90,
            };
        case ELEMENTS.WATER:
            return {
                xOffset: 50,
                yOffset: -75,
            };
        case ELEMENTS.AIR:
            return {
                xOffset: 54,
                yOffset: -44,
            };
        case ELEMENTS.FIRE:
            return {
                xOffset: 42,
                yOffset: -50,
            };
        }
    } else if (statLevel[STATS.CORE] > 4) {
        switch (friendoType) {
            case ELEMENTS.EARTH:
            return {
                xOffset: 25,
                yOffset: -100,
            };
        case ELEMENTS.WATER:
            return {
                xOffset: 50,
                yOffset: -64,
            };
        case ELEMENTS.AIR:
            return {
                xOffset: 50,
                yOffset: -10,
            };
        case ELEMENTS.FIRE:
            return {
                xOffset: 22,
                yOffset: -50,
            };
        }
    } else if (statLevel[STATS.CORE] > 2) {
        switch (friendoType) {
            case ELEMENTS.EARTH:
                return {
                    xOffset: 25,
                    yOffset: -60,
                };
            case ELEMENTS.WATER:
                return {
                    xOffset: 22,
                    yOffset: -40,
                };
            case ELEMENTS.AIR:
                return {
                    xOffset: 24,
                    yOffset: -18,
                };
            case ELEMENTS.FIRE:
                return {
                    xOffset: 22,
                    yOffset: -20,
                };
        }
    } else {
        switch (friendoType) {
            case ELEMENTS.EARTH:
            case ELEMENTS.WATER:
                return {
                    xOffset: 25,
                    yOffset: -30,
                };
            case ELEMENTS.AIR:
                return {
                    xOffset: 24,
                    yOffset: -18,
                };
            case ELEMENTS.FIRE:
                return {
                    xOffset: 14,
                    yOffset: -20,
                };
        }
    }
}

// draw arms based off arm level
// x and y here are coordinates of the core
const drawArms = function (g, x, y) {
    // only draw if has arms at all
    if (statLevel[STATS.ARM] < 1) return;

    const {xOffset, yOffset} = computeArmTethers();

    const armGirth = statLevel[STATS.ARM] * 2;
    const armLength = Math.floor(((statLevel[STATS.ARM] - 1) * 6) + 10);

    let brush;
    switch (friendoType) {
        case ELEMENTS.EARTH:
            brush = function(_g) {
                drawEarthArm(_g, 0, 0, armGirth, armLength);
            }
            break;
        case ELEMENTS.WATER:
            brush = function(_g) {
                drawWaterArm(_g, 0, 0, armGirth, armLength);
            }
            break;
        case ELEMENTS.AIR:
            brush = function(_g) {
                drawAirArm(_g, 0, 0, armGirth, armLength);
            }
            break;
        case ELEMENTS.FIRE:
            brush = function(_g) {
                drawFireArm(_g, 0, 0, armGirth, armLength);
            }
            break;
    }

    drawLeftArm(g, x-xOffset, y+yOffset, brush);
    drawRightArm(g, x+xOffset, y+yOffset, brush);
}
const drawLeftArm = function(g, x, y, brush) {
    g.save();
    g.translate(x, y);
    g.rotate(Math.PI * .25);
    brush(g);
    g.restore();

    drawHookMarker(g, x, y);
}
const drawRightArm = function(g, x, y, brush) {
    g.save();
    g.translate(x, y);
    // mirror relative to left arm
    g.rotate(Math.PI * 1.75);
    g.scale(-1, 1);
    brush(g);
    g.restore();

    drawHookMarker(g, x, y);
}
