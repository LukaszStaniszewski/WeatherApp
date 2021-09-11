## Do czego jest ta aplikacja?
Aplikacja Webowa stworzona do wyświetlania pogody zarówno obecnej jak i na przyszły tydzień. Wskazuje pogodę w większości miast na świecie, ikony dostosowują się do wyświetlanych informacji. Jest w pełni responsywna, dostosowuje się do urządzeń mobilnych.

![alt text](https://github.com/LukaszStaniszewski/service/blob/main/WeatherAppMain.jpg?raw=true)


## Wykorzytane technologie:
Podstawowy JavaScript, CSS oraz HTML. Zdecydowałem się zrobić projekt bez używania frameworków, aby zaprezenotować znajomość podstaw DOM oraz JavaScriptu.

## Wyjaśnienie kodu JavaScript:
Do pobrania danych o pogdzie, zostało wykorzystane darmowe API z openweathermap.org

Pobieranie domyślnych danych na temat pogody, które użytkownik zobaczy gdy wejdzie na stronę. Zostanie wysłane żądanie o dane pogodowe w Warszawie. Axios automatycznie parsuje format JSON nad obiekt JavaScript, który zostanie przesłany do dalszych funkcji gdy zostanie zrealizowana obietnica.

```javascript
const defDisplay = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=ca452ec3ab9eacf9df94887f4330a2a&units=metric`)
.then((defDisplay) => {
  
main(defDisplay.data.coord)
currentDay(defDisplay.data)
})
.catch((err) => {
  
  console.log(err)
})
```

1. Nazwa miasta wpisana przez użytkownika w formularzu jest przesyłana do API, który zwraca obiekt z danymi pogodowymi na temat miasta interesującego użytkownika. Następnie          zostają wywołane funkcję odpowiadające za wyświetlanie informacji na stronie internetowej, oraz reset tekstu w formularzu.
  ```javascript
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(form)
    const searchForm = form.elements.query.value 

    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchForm}&appid=ca452ec3ab9eacf9df94887f4330a2a&units=metric`);
    main(res.data.coord);
    currentDay(res.data);

    form.elements.query.value = ''; 
  })
  ```

2. Funkcja pobierająca i wysyłająca dane pogodowych na cały tydzień. API przyjmuje współrzędne miasta, które są przekazywane z obiektu przesłanego przez API dotyczącego miasta        wyszukanego przez użytkownika. Według dokumentacji openweathermap API zwracające dane tygodniowe przyjmuje jako wartość współrzędne, a nie nazwę miasta stąd wykorzystanie dwóch    API do jednego zadania.
  ```javascript
  const main = async (userRequest) => {
    const {lon, lat} = userRequest;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?                lat=${lat}&lon=${lon}&exclude=alerts,minutelyp&appid=ca452ecab9eac3f9df94887f4330a2a&units=metric`);
    weeklyWeather(response.data)

  }
  ```
3. Funkcja przekazująca dane dotyczącego obecnego dnia do użytkownika. API przekazuje timestamp, więc aby wyświetlić nazwę obecnego dnia została wykorzystana metoda Date, która      zwraca nie tylko dzień, ale też miesiąc rok i godzinę. Żeby pozyskać tylko dzień została użyta metoda getDay() zwracająca liczbę z obecnej daty dostarczonej przez zmienną date,    stąd tablica z nazwami tygodnia, odpowiadająca kolejno liczbą zwracanych przez getDay(). Tablica zwraca string odpowiednio określony przez liczbę z getDay, następnie ten          zostaje dodany do odpowiedniego spanu w HTML który odowiada za wyświetlenie tego dnia. 

  Pozostałe dane zostały uzyskane poprzez odwoływanie się do elementów w obiekcie.
  ```javascript
  const currentDay = (data) => {
    const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',  ]

    let timestamp = data.dt * 1000
    const date = new Date(timestamp);
    document.querySelector('#weather_header-display').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('#weather_info--date_display').textContent = days[date.getDay()]
    document.querySelector('#display_temp_today').textContent = data.main.temp;  
    const conditions = data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1);
    document.querySelector('#weather_info--date_conditions').textContent = conditions;

    document.querySelector('#weather-info--data_wind').textContent = data.wind.speed
    document.querySelector('#weather-info--data_humidity').textContent = data.main.humidity
    document.querySelector('#weather_info--data_realFeel').textContent = data.main.feels_like
    for(let api of array){
      data.weather[0].main === api.apiDescription ? document.querySelector('#today_icon').innerHTML = api.img : ''
     }
   ```
  4. Funkcja odpowiadająca za wyświetlanie danych na temat całego tygodnia. Zostają pobrane dane o temperaturze w ciągu dnia i nocy oraz ikona zmieniająca się zależnie od pogody.
     API zwraca listę obiektów o numerach 0-7 odpowiadającym poszczególnym dniom, są one destrukturyzowane co powoduje powstanie nowych zmiennych, z nazwami odpowiadającymi danym      na temat który zawierają dane. Następnie te zmienne przekazują dane na temat pogody w dzień i nocy do poszczególnych znaczników w html.
     
     Ikony obrazujące obecną pogodę są zmieniane poprzez iterowanie po tabeli zawierającym obiekty z ikonami font-awsome oraz nazwami odpowiadającymi nazwom pogody przesyłanych        przez APi w DOM strony. Jeżeli nazwa opisująca pogodę z APi zgadza się z nazwą stworzonego przeze mnie obiektu, zostaje wyświetlona ikona przypisana do tego obiektu.

   ```javascript
      const weeklyWeather = (data) => {

      const {0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday, 7: NextSunday} = data.daily;
      /************************  Monday **********************/
      document.querySelector('#weather-week-monday-day').textContent = Monday.temp.day;
      document.querySelector('#weather-week-monday-night').textContent = Monday.temp.night;
      for(let api of array){
        Monday.weather[0].main === api.apiDescription ? document.querySelector('#monday_icon').innerHTML = api.img : ''

      }
      /************************  Tuesday **********************/
      document.querySelector('#weather-week-Tuesday-day').textContent = Tuesday.temp.day;
      document.querySelector('#weather-week-Tuesday-night').textContent = Tuesday.temp.night;
      for(let api of array){
        Tuesday.weather[0].main === api.apiDescription ? document.querySelector('#tuesday_icon').innerHTML = api.img : ''

      }
      /************************  Wednesday **********************/
      document.querySelector('#weather-week-Wendsday-day').textContent = Wednesday.temp.day;
      document.querySelector('#weather-week-Wendsday-night').textContent = Wednesday.temp.night;
      for(let api of array){
         Wednesday.weather[0].main === api.apiDescription ? document.querySelector('#wednesday_icon').innerHTML = api.img : ''

      }
      /************************ Thursday **********************/
      document.querySelector('#weather-week-Thursday-day').textContent = Thursday.temp.day;
      document.querySelector('#weather-week-Thursday-night').textContent = Thursday.temp.night;
      for(let api of array){
        Thursday.weather[0].main === api.apiDescription ? document.querySelector('#thursday_icon').innerHTML = api.img : ''

      }
      /************************  Friday **********************/
      document.querySelector('#weather-week-Friday-day').textContent = Friday.temp.day;
      document.querySelector('#weather-week-Friday-night').textContent = Friday.temp.night;
      for(let api of array){
        Friday.weather[0].main === api.apiDescription ? document.querySelector('#friday_icon').innerHTML = api.img : ''

      }
      /************************  Saturday **********************/
      document.querySelector('#weather-week-Saturday-day').textContent = Saturday.temp.day;
      document.querySelector('#weather-week-Saturday-night').textContent = Saturday.temp.night;
      for(let api of array){
        Saturday.weather[0].main === api.apiDescription ? document.querySelector('#saturday_icon').innerHTML = api.img : ''

      }

      /************************  Sunday **********************/
      document.querySelector('#weather-week-Sunday-day').textContent = Sunday.temp.day;
      document.querySelector('#weather-week-Sunday-night').textContent = Sunday.temp.night;
      for(let api of array){
       Sunday.weather[0].main === api.apiDescription ? document.querySelector('#sunday_icon').innerHTML = api.img : ''

      }
     }
    
