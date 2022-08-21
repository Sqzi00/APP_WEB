var StatsApp = /** @class */ (function () {
    function StatsApp() {
        this.getInputs();
        this.watchInputValues();
    }
    StatsApp.prototype.getInputs = function () {
        this.data1Input = document.querySelector('#data1');
        this.data2Input = document.querySelector('#data2');
        this.data3Input = document.querySelector('#data3');
        this.data4Input = document.querySelector('#data4');
        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    StatsApp.prototype.watchInputValues = function () {
        var _this = this;
        this.data1Input.addEventListener('input', function () { return _this.computeData(); });
        this.data2Input.addEventListener('input', function () { return _this.computeData(); });
        this.data3Input.addEventListener('input', function () { return _this.computeData(); });
        this.data4Input.addEventListener('input', function () { return _this.computeData(); });
    };
    StatsApp.prototype.computeData = function () {
        var data1 = +this.data1Input.value;
        var data2 = +this.data2Input.value;
        var data3 = +this.data3Input.value;
        var data4 = +this.data4Input.value;
        var sum = data1 + data2 + data3 + data4;
        var avg = sum / 4;
        var min = Math.min(data1, data2, data3, data4);
        var max = Math.max(data1, data2, data3, data4);
        this.showTime(sum, avg, min, max);
    };
    StatsApp.prototype.showTime = function (sum, avg, min, max) {
        this.sumInput.value = sum.toString();
        this.avgInput.value = avg.toString();
        this.minInput.value = min.toString();
        this.maxInput.value = max.toString();
    };
    return StatsApp;
}());
var statsApp = new StatsApp();
