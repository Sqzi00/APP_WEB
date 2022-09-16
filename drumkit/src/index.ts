class DrumKit
{
    sounds : NodeListOf<HTMLAudioElement>;
    private recordChannel : number;
    private Channels : any[][];
    private ChannelResetTime : number[];

    constructor(){
        this.DrumKitStart()
    }

    DrumKitStart() :void{
        document.addEventListener('keypress', (ev: KeyboardEvent) => this.OnKeyPress(ev));
        this.GetElements();
        this.recordChannel = -1;
        this.Channels = new Array<Array<any>>();
        this.ChannelResetTime = new Array<number>();
    }
    
    GetElements() : void{
        this.sounds = document.querySelectorAll('#sounds audio');
    }
    
    OnKeyPress(ev: KeyboardEvent): void{
        this.PlaySoundByKey(ev.key);
    }
    
    PlaySoundByKey(key: string) : void{
        key = key.toUpperCase();
        this.sounds.forEach((e : HTMLAudioElement) => {
            if(e.dataset.key == key){
                this.PlaySound(e);
            }
        });
    }

    PlaySoundBySoundName(sound: string) : void {
        sound = sound.toLowerCase();
        this.sounds.forEach((e : HTMLAudioElement) => {
            if(e.dataset.sound == sound){
                this.PlaySound(e);
            }
        });
     }
    
    
    PlaySound(sound : HTMLAudioElement) : void{
        sound.currentTime = 0;
        sound.play();
        this.AddSoundToRecordChannel(sound);
    }

    AddSoundToRecordChannel(sound : HTMLAudioElement) : void{
        if(this.recordChannel != -1){
            this.Channels[this.recordChannel].push({sound, time: document.timeline.currentTime});
        }
    }

    RecordStart(channel: number){
        this.recordChannel = channel;
        this.Channels[channel] = [];
        this.ChannelResetTime[channel] = document.timeline.currentTime;
    }

    RecordStop(){
        this.recordChannel = -1;
    }

    RecordPlay(channel: number){
        let bufforResetTime = this.ChannelResetTime[channel];
        this.Channels[channel].forEach(soundTimeObj => {
            setTimeout(() => this.PlaySound(soundTimeObj.sound) ,(soundTimeObj.time - bufforResetTime))
        })
    }

}

class DrumKitView{

    drumKit : DrumKit
    btnsRoot : HTMLDivElement

    stateMonitor : HTMLDivElement;
    stopButton : HTMLButtonElement;

    constructor(){
        this.CreateDrumKitView();
    }

    CreateDrumKitView(){
        this.GetElements();
        this.CreateButtons();
        this.AddEventListeners();
    }

    GetElements() : void{
        this.drumKit = new DrumKit();
        this.btnsRoot = document.querySelector("#soundBtns");      
        this.stateMonitor = document.querySelector(".State");
        this.stopButton = document.querySelector("#Stop");
    }
   
    AddEventListeners(){
        let Channels = document.querySelectorAll(".Channels div");
        Channels.forEach((e) => {
            e.children[0].addEventListener('click', () => this.RecordStart(+e.id));
            e.children[1].addEventListener('click', () => this.RecordPlay(+e.id));
        })
        this.stopButton.addEventListener('click', () => this.RecordStop());
    }

    RecordStart(channel: number){
        this.stateMonitor.innerHTML = "Recording Ch" + (channel+1);
        this.stateMonitor.classList.add("RecordingStatus");
        this.stopButton.classList.remove("InActive");
        this.drumKit.RecordStart(channel);
    }

    RecordPlay(channel: number){
        this.drumKit.RecordPlay(channel);
    }

    RecordStop(){
        this.stateMonitor.innerHTML = "Ready";
        this.stateMonitor.classList.remove("RecordingStatus");
        this.stopButton.classList.add("InActive");
        this.drumKit.RecordStop;
    }

    CreateButtons(): void{
        this.drumKit.sounds.forEach((sound : HTMLAudioElement) => {
            this.btnsRoot.appendChild(this.GetNewButton(sound));
        });
    }

    GetNewButton(sound : HTMLAudioElement) : HTMLButtonElement{
        let btn = document.createElement("button");
        let soundNameElement = document.createElement("h2");
        soundNameElement.innerHTML = sound.dataset.sound;
        btn.appendChild(soundNameElement);
        let keyNameElement = document.createElement("h3");
        keyNameElement.innerHTML = sound.dataset.key;
        btn.appendChild(keyNameElement);
        btn.addEventListener('click', () => this.drumKit.PlaySound(sound))
        return btn;
    }
}

function appStart() :void{
    let drumKit = new DrumKitView();
}

appStart();
