export class App {
    opwApiKey = 'b9b76d61d19f58b36a75e6b0bce42cef';
    // APIkey='21066d49d06760da7aa54388670e089c'
    boxNumber: number = 0;

    constructor() {
        this.onClickButton();
         this.onClickButton1();
        
        this.fetchFromStorage("T");
        //odswiezanie co 1 min
         //setInterval(()=> this.fetchFromStorage("N"),1200000);
    }

    //dodanie miasta przez button lub enter
    onClickButton(){
        const addByBtn = <HTMLInputElement>document.getElementById('cityAdd');
        addByBtn.addEventListener('click', (ev:Event) => this.getCityName());

        const addByEnter = document.body;
        addByEnter.addEventListener('keydown', (ev:KeyboardEvent) => {
            if(ev.key === 'Enter'){
                this.getCityName();
            }
        });
    }
   // usuwanie z local
    onClickButton1(){
        const removeByBtn = <HTMLInputElement>document.getElementById('cityRemove');
        removeByBtn.addEventListener('click',(ev:Event)=>  this.myFunc());

    
    }
    myFunc(){
         localStorage.clear()
         this.fetchFromStorage("Y"); 
      //localStorage.weatherData = JSON.stringify(JSON.parse(localStorage.weatherData ?? "[]").slice(0, -1))
           
    }

    //pobieranie danych z api i zwracanie obiektu weatherData (json)
    async getWeather(city: string): Promise<any> {
         const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        // const openWeatherUrl = `http://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid=${this.APIkey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    //pobieranie nazwy miasta z inputa i wywolywanie getCityWeather
    getCityName(){
        const cityInput = <HTMLInputElement>document.getElementById('cityName');
        const city = cityInput.value;
        this.getCityWeather(city);
    }

    //tworzenie nowego okna pogodowego i zapis do local storage
    async getCityWeather(city: string) {
        const weather = await this.getWeather(city);

        //pobieranie danych z jsona
        const name = weather.name;
        const img =  `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const temp = Math.round(weather.main.temp - 273.15).toString();
        const sky = weather.weather[0].main;
        const pressure = weather.main.pressure;
        const humidity = weather.main.humidity;
        const wind = weather.wind.speed;

        
        //tworzenie szkieletu
        const weatherBox = document.createElement('div');
        weatherBox.className = 'weatherBoxClass';
        weatherBox.setAttribute("id","weatherBoxId" + this.boxNumber);
        const weatherCityName = document.createElement('h1');
        const weatherCityImg = document.createElement('img');
        const weatherCityTemp = document.createElement('p');
        const weatherCitySky = document.createElement('p');
        const weatherCityPressure = document.createElement('p');
        const weatherCityHumidity = document.createElement('p');
        const weatherCityWind = document.createElement('p');

        //dodanie styli do szkieletu
        weatherBox.classList.add('weatherBox');

        //uzupelnienie szkieletu danymi
        weatherCityName.innerHTML = name;
        weatherCityImg.src = img;
        weatherCityTemp.innerHTML = "Temp: " + temp +"&deg;C";
        weatherCitySky.innerHTML = "Sky: " + sky;
        weatherCityPressure.innerHTML = "Pressure: " + pressure + " hPA";
        weatherCityHumidity.innerHTML = "Humidity: " + humidity + "%";
        weatherCityWind.innerHTML = "Wind Speed: " + wind + " m/sec";

        //wrzucenie szkieletu z danymi na strone
        const space = document.getElementById('weathers');
        space.appendChild(weatherBox);
        weatherBox.appendChild(weatherCityName);
        weatherBox.appendChild(weatherCityImg);
        weatherBox.appendChild(weatherCityTemp);
        weatherBox.appendChild(weatherCitySky);
        weatherBox.appendChild(weatherCityPressure);
        weatherBox.appendChild(weatherCityHumidity);
        weatherBox.appendChild(weatherCityWind);

        //czyszczenie inputa i zapisanie do pamieci
        const cityInput = <HTMLInputElement>document.getElementById("cityName");
        cityInput.value = "";
        this.saveData(weather);

    }

    fetchFromStorage(saveMeLocal:string){
        this.deleteWindows();
        const tab = localStorage.length;

        for (let i = 1; i < tab; i++) {
            let nazwa;
            nazwa = localStorage.getItem("weatherData" +i);
            const nazwa2= JSON.parse(nazwa);
            if(saveMeLocal ==="T"){
            this.getCityWeatherFromStorage(nazwa2,"T");
            }
            else{
                this.getCityWeatherFromStorage(nazwa2,"N");
            }
        }
    }

    //pobieranie z localStorage
    async getCityWeatherFromStorage(nazwa:any,saveMeLocal:string) {

        const weather = await this.getWeather(nazwa.name);

        //pobieranie danych z jsona
        const name = weather.name;
        const img =  `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        const temp = Math.round(weather.main.temp - 273.15).toString();
        const sky = weather.weather[0].main;
        const pressure = weather.main.pressure;
        const humidity = weather.main.humidity;
        const wind = weather.wind.speed;

        //tworzenie szkieletu
        const weatherBox = document.createElement('div');
        weatherBox.className = 'weatherBoxClass'
        weatherBox.setAttribute("id","weatherBoxId" + this.boxNumber);
        const weatherCityName = document.createElement('h1');
        const weatherCityImg = document.createElement('img');
        const weatherCityTemp = document.createElement('p');
        const weatherCitySky = document.createElement('p');
        const weatherCityPressure = document.createElement('p');
        const weatherCityHumidity = document.createElement('p');
        const weatherCityWind = document.createElement('p');
        //dodanie styli do szkieletu
        weatherBox.classList.add('weatherBox');

        //uzupelnienie szkieletu danymi
        weatherCityName.innerHTML = name;
        weatherCityImg.src = img;
        weatherCityTemp.innerHTML = "Temp: " + temp +"&deg;C";
        weatherCitySky.innerHTML = "Sky: " + sky;
        weatherCityPressure.innerHTML = "Pressure: " + pressure + " hPA";
        weatherCityHumidity.innerHTML = "Humidity: " + humidity + "%";
        weatherCityWind.innerHTML = "Wind Speed: " + wind + " m/sec";

        //wrzucenie szkieletu z danymi na strone
        const space = document.getElementById('weathers');
        space.appendChild(weatherBox);
        weatherBox.appendChild(weatherCityName);
        weatherBox.appendChild(weatherCityImg);
        weatherBox.appendChild(weatherCityTemp);
        weatherBox.appendChild(weatherCitySky);
        weatherBox.appendChild(weatherCityPressure);
        weatherBox.appendChild(weatherCityHumidity);
        weatherBox.appendChild(weatherCityWind);

        //czyszczenie inputa
        const cityInput = <HTMLInputElement>document.getElementById("cityName");
        cityInput.value = "";
        //jesli T to zapisuje do pamieci- N nie zapisuje
        if(saveMeLocal === "T")
        this.saveData(weather);

    }

    //zapis do local storage
    saveData(data: any) {
        this.boxNumber++;
        localStorage.setItem('weatherData' + this.boxNumber, JSON.stringify(data));
    }

    



    //wyciaganie z pamieci
    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }

   

    //usuawnie okienek
    deleteWindows(){
        const div= document.getElementById('weathers');
        
        div.textContent = "";
    }
}



























