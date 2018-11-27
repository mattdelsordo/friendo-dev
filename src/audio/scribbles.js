const scribble = require('scribbletune');

const getRandomPattern = function (count) {
  let str = '';
  for (let i=0; i < (count || 8); i++) {
    str += Math.round(Math.random()) ? 'x-' : '-x';
  }

  return str;
}

const ptn = getRandomPattern();
function getRiff(key = 'D', scale = 'harmonic minor') {
  const scaleInKey = scribble.scale(key + '3 ' + scale);

  function getClip(prog = 'i III ii') {
    const theChords = scribble.progression.getChords(key + '4 ' + scale, prog);
    const arpNotes = scribble.arp({
      chords: theChords, // you can even provide a string like 'Cm Fm Cm Fm Cm Gm Cm DM'
      count: 3, // you can set any number from 2 to 8
      order: '102'
    });

    const clip = [];
    let arpNotesCount = 0;

    for (var i = 0; i < ptn.length; i++) {
      if (ptn[i] === 'x') {
        clip.push({ note: [ arpNotes[arpNotesCount] ], length: 64, level: 127 });
        arpNotesCount++;
      } else {
        clip.push({ note: [ scaleInKey[Math.round(Math.random() * 3)] ], length: 32, level: 127 });
        clip.push({ note: null, length: 32, level: 127 });
      }
    }

    return clip;
  }
  const clip = getClip();
  return [...clip, ...clip, ...clip, ...getClip('i v VII')]
}

const dRiff1 = getRiff();
const gRiff1 = getRiff('G', 'major');
const gRiff2 = getRiff('G', 'major');
const aRiff1 = getRiff('A', 'major');
const aRiff2 = getRiff('A', 'major');

scribble.midi([...dRiff1, ...gRiff1, ...dRiff1, ...aRiff1]);
