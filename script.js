function startTone() {
	Tone.start().then(() => { 
        console.log("audio is ready"); 
        playScrewedTheme();
    });
}

async function playScrewedTheme() {
    await Tone.start();
  
    const bass = new Tone.MonoSynth({
      oscillator: { type: "square" },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 1 }
    }).toDestination();
  
    const keys = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack: 0.5, release: 1 }
    }).toDestination();
  
    const delay = new Tone.FeedbackDelay("8n", 0.4).toDestination();
    keys.connect(delay);
  
    Tone.Transport.bpm.value = 40;
  
    const melody = ["C3", null, "E3", null, "G3", null, "C3", null];
  
    const seq = new Tone.Sequence((time, note) => {
      if (note) {
        keys.triggerAttackRelease(note, "8n", time);
        bass.triggerAttackRelease(note.replace("3", "1"), "4n", time);
      }
    }, melody, "4n").start(0);
  
    Tone.Transport.start();
  }