/*
    Defines the track that plays during character selection and the egg phase
*/

// Define voices
VoicForm voice => Pan2 p => dac;
0.1 => p.pan => float PAN;
0.4 => voice.gain => float GAIN;
Shakers shake => dac;
9 => shake.preset;
1 => shake.energy;
//128 => shake.objects;


// Define tempo, etc
112 => int BPM;
1::minute / BPM => dur q_note;

// Plays a voice part at the given note
fun void playVoice(int note, dur d, float pan, float accent, string phon0, string phon1) {
    pan => p.pan;
    GAIN + accent => voice.gain; // "accent" is additive on gain
    
    note => Std.mtof => voice.freq;
    1 => voice.noteOn;
    phon0 => voice.phoneme;
    d * 0.3 => now;
    phon1 => voice.phoneme;
    d * 0.65 => now;
    1 => voice.noteOff;
    d * 0.05 => now;
}

// Play bass line
fun void doodoo() {
    playVoice(46, q_note, PAN, 0.3, "ddd", "ooo");
    playVoice(53, q_note, 0, 0, "ddd", "ooo");
    playVoice(41, q_note, -PAN, 0.3, "ddd", "ooo");
    playVoice(53, q_note, 0, 0, "ddd", "ooo");

    playVoice(46, q_note, PAN, 0.3, "ddd", "ooo");
    playVoice(53, q_note, 0, 0, "ddd", "ooo");
    playVoice(41, q_note * 0.66, -PAN, 0.3, "ddd", "ooo");
    playVoice(41, q_note * 0.34, -PAN, 0.1, "ddd", "ooo");
    playVoice(53, q_note, 0, 0, "ddd", "ooo");
}

// Play shaker rhythm
fun void tsstss1() {
    repeat(7) {
        1 => shake.noteOn;
        q_note => now;
        0.8 => shake.noteOn;
        q_note * 0.66 => now;
        0.7 => shake.noteOn;
        q_note * 0.34 => now;
    }
}
fun void tsstss2() {
    1 => shake.noteOn;
    q_note *0.66 => now;
    0.8 => shake.noteOn;
    q_note => now;
    0.8 => shake.noteOn;
    q_note => now;
    0.7 => shake.noteOn;
    q_note *0.34 => now;
    1 => shake.noteOn;
    q_note => now;
}

fun void doodooLooped() { while(true) { doodoo(); }}
fun void tsstssLooped() { while(true) { 
    repeat(3){ tsstss1(); }
    tsstss2();
}}

// play track
// whole thing is 32 beats
spork ~ doodooLooped();
spork ~ tsstssLooped();
32 * q_note => now;
