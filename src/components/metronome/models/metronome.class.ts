type SetFunction = (callback: Function) => void;

export class Metronome {
  private _context: AudioContext;
  private _bpm: number;
  private _running: boolean;
  private _frequency: number;
  private _volume: number;
  private _compass: number;
  private _currentValue: number;
  private _antValue: number;
  private osc: OscillatorNode | undefined;
  private gain: GainNode | undefined;
  private _callBack: Function;

  constructor(
    contexto: AudioContext,
    compassInit: number = 4,
    callback = () => {}
  ) {
    this._context = contexto;
    this._bpm = 60;
    this._running = false;
    this._frequency = 260;
    this._volume = 1;
    this._compass = compassInit;
    this._currentValue = 1;
    this._antValue = compassInit;
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.osc = undefined;
    this.gain = undefined;
    this._callBack = callback;
  }

  public set callback(newCallBack: Function) {
    this._callBack = newCallBack;
  }

  public set compass(newCompas: number) {
    this._compass = newCompas;
  }

  /**
   * @param {number} newVolume
   */
  public set volume(newVolume: number) {
    this._volume = newVolume;
  }

  /**
   * @param {number} newBpm
   */
  public set bpm(newBpm: number) {
    this._bpm = newBpm;
  }

  /**
   * @param {number} newFrequency
   */
  public set frequency(newFrequency: number) {
    this._frequency = newFrequency;
  }

  public get currentValue() {
    return this._currentValue;
  }

  public get antValue() {
    return this._antValue;
  }

  public set currentValue(newValue: number) {
    this._currentValue = newValue;
  }

  public set antValue(newValue: number) {
    this._antValue = newValue;
  }

  private incrementarCurrentValue = () => {
    this._antValue = this._currentValue;
    this._currentValue = this._currentValue + 1;
    if (this._currentValue > this._compass) {
      this._currentValue = 1;
    }
  };

  public get bpm() {
    return this._bpm;
  }

  public play() {
    if (this._running) return;
    this._running = true;
    const self = this;
    function play2() {
      let now = self._context.currentTime;
      function run() {
        //console.log(self.antValue, self.currentValue);
        if (!self._running) return;
        self.osc = self._context.createOscillator();
        self.osc.frequency.setValueAtTime(self._frequency, now);
        self.gain = self._context.createGain();
        self.gain.gain.value = self._volume;
        self.osc.connect(self.gain);
        self.gain.connect(self._context.destination);
        self.gain.gain.setValueAtTime(2, now);
        self.gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 60 / self._bpm
        );
        self.osc.onended = run;
        self.osc.start(now);
        self.osc.stop(now + 60 / self._bpm);
        now += 60 / self._bpm;
        self.incrementarCurrentValue();
        self.action();
      }
      run();
    }

    play2();
  }

  public stop() {
    if (this.osc && this.gain) {
      this._running = false;
      this._currentValue = 1;
      this.osc.disconnect();
      this.gain.disconnect();
      this.osc = undefined;
      this.gain = undefined;
    }
  }

  public action = () => {
    this._callBack((prev: any) => {
      let temp = structuredClone(prev);
      temp.current = this._currentValue - 1;
      temp.ant = this._antValue - 1;
      return temp;
    });
  };
}
