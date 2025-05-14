function startTone() {
	Tone.start().then(() => { 
        console.log("audio is ready"); 
        PlayRiff();
    });
}

function PlayRiff() {
    const synth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.8 }
    }).toDestination();
  
    const bass = new Tone.MonoSynth({
      oscillator: { type: "square" },
      filter: { Q: 2, type: "lowpass", rolloff: -24 },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 1 },
      filterEnvelope: { attack: 0.01, decay: 0.1, sustain: 0.8, release: 1, baseFrequency: 200, octaves: 2.6 }
    }).toDestination();
  
    const now = Tone.now();
  
    // Moody minor riff (inspired feel)
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("Eb4", "8n", now + 0.5);
    synth.triggerAttackRelease("G4", "8n", now + 1);
    synth.triggerAttackRelease("Bb3", "8n", now + 1.5);
    synth.triggerAttackRelease("G4", "4n", now + 2);
  
    // Looped bass (C - G - Bb - Ab)
    const bassLoop = new Tone.Loop((time) => {
      const notes = ["C2", "G1", "Bb1", "Ab1"];
      const note = notes[Math.floor(Math.random() * notes.length)];
      bass.triggerAttackRelease(note, "8n", time);
    }, "4n").start(0);
  
    Tone.Transport.bpm.value = 90;
    Tone.Transport.start();
  }