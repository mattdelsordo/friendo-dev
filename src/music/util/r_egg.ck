// Records "egg"
// ** MAKE SURE TRACK DURATIONS ARE THE SAME **

me.dir(-3) + "docs/sound/music/" => string path;
path + "egg.wav" => string filename;
<<< filename >>>;

// Add track in question
Machine.add(me.dir(-1) + "egg.ck");

// RECORD

// pull samples from the dac
dac => Gain g => WvOut w => blackhole;
// this is the output file name
filename => w.wavFilename;
<<<"writing to file:", "'" + w.filename() + "'">>>;
// any gain you want for the output
0.8 => g.gain;

// temporary workaround to automatically close file on remove-shred
null @=> w;

112 => int BPM;
32 => int BEATS;
(1::minute/BPM)*BEATS => now;
