var DrumKit = /** @class */ (function () {
    function DrumKit() {
        this.DrumKitStart();
    }
    DrumKit.prototype.DrumKitStart = function () {
        var _this = this;
        document.addEventListener('keypress', function (ev) { return _this.OnKeyPress(ev); });
        this.GetElements();
        this.recordChannel = -1;
        this.Channels = new Array();
        this.ChannelResetTime = new Array();
    };
    DrumKit.prototype.GetElements = function () {
        this.sounds = document.querySelectorAll('#sounds audio');
    };
    DrumKit.prototype.OnKeyPress = function (ev) {
        this.PlaySoundByKey(ev.key);
    };
    DrumKit.prototype.PlaySoundByKey = function (key) {
        var _this = this;
        key = key.toUpperCase();
        this.sounds.forEach(function (e) {
            if (e.dataset.key == key) {
                _this.PlaySound(e);
            }
        });
    };
    DrumKit.prototype.PlaySoundBySoundName = function (sound) {
        var _this = this;
        sound = sound.toLowerCase();
        this.sounds.forEach(function (e) {
            if (e.dataset.sound == sound) {
                _this.PlaySound(e);
            }
        });
    };
    DrumKit.prototype.PlaySound = function (sound) {
        sound.currentTime = 0;
        sound.play();
        this.AddSoundToRecordChannel(sound);
    };
    DrumKit.prototype.AddSoundToRecordChannel = function (sound) {
        if (this.recordChannel != -1) {
            this.Channels[this.recordChannel].push({ sound: sound, time: document.timeline.currentTime });
        }
    };
    DrumKit.prototype.RecordStart = function (channel) {
        this.recordChannel = channel;
        this.Channels[channel] = [];
        this.ChannelResetTime[channel] = document.timeline.currentTime;
    };
    DrumKit.prototype.RecordStop = function () {
        this.recordChannel = -1;
    };
    DrumKit.prototype.RecordPlay = function (channel) {
        var _this = this;
        var bufforResetTime = this.ChannelResetTime[channel];
        this.Channels[channel].forEach(function (soundTimeObj) {
            setTimeout(function () { return _this.PlaySound(soundTimeObj.sound); }, (soundTimeObj.time - bufforResetTime));
        });
    };
    return DrumKit;
}());
var DrumKitView = /** @class */ (function () {
    function DrumKitView() {
        this.CreateDrumKitView();
    }
    DrumKitView.prototype.CreateDrumKitView = function () {
        this.GetElements();
        this.CreateButtons();
        this.AddEventListeners();
    };
    DrumKitView.prototype.GetElements = function () {
        this.drumKit = new DrumKit();
        this.btnsRoot = document.querySelector("#soundBtns");
        this.stateMonitor = document.querySelector(".State");
        this.stopButton = document.querySelector("#Stop");
    };
    DrumKitView.prototype.AddEventListeners = function () {
        var _this = this;
        var Channels = document.querySelectorAll(".Channels div");
        Channels.forEach(function (e) {
            e.children[0].addEventListener('click', function () { return _this.RecordStart(+e.id); });
            e.children[1].addEventListener('click', function () { return _this.RecordPlay(+e.id); });
        });
        this.stopButton.addEventListener('click', function () { return _this.RecordStop(); });
    };
    DrumKitView.prototype.RecordStart = function (channel) {
        this.stateMonitor.innerHTML = "Recording Ch" + (channel + 1);
        this.stateMonitor.classList.add("RecordingStatus");
        this.stopButton.classList.remove("InActive");
        this.drumKit.RecordStart(channel);
    };
    DrumKitView.prototype.RecordPlay = function (channel) {
        this.drumKit.RecordPlay(channel);
    };
    DrumKitView.prototype.RecordStop = function () {
        this.stateMonitor.innerHTML = "Ready";
        this.stateMonitor.classList.remove("RecordingStatus");
        this.stopButton.classList.add("InActive");
        this.drumKit.RecordStop;
    };
    DrumKitView.prototype.CreateButtons = function () {
        var _this = this;
        this.drumKit.sounds.forEach(function (sound) {
            _this.btnsRoot.appendChild(_this.GetNewButton(sound));
        });
    };
    DrumKitView.prototype.GetNewButton = function (sound) {
        var _this = this;
        var btn = document.createElement("button");
        var soundNameElement = document.createElement("h2");
        soundNameElement.innerHTML = sound.dataset.sound;
        btn.appendChild(soundNameElement);
        var keyNameElement = document.createElement("h3");
        keyNameElement.innerHTML = sound.dataset.key;
        btn.appendChild(keyNameElement);
        btn.addEventListener('click', function () { return _this.drumKit.PlaySound(sound); });
        return btn;
    };
    return DrumKitView;
}());
function appStart() {
    var drumKit = new DrumKitView();
}
appStart();
