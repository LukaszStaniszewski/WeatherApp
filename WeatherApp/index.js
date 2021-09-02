
const form = document.querySelector('#weather_form')

/************************  default display value **********************/

const defDisplay = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=ca452ec3ab9eac3f9df94887f4330a2a&units=metric`)
.then((defDisplay) => {
  
  main(defDisplay.data.coord)
  currentDay(defDisplay.data)
})
.catch((err) => {
  
  console.log(err)
})


/********************************  user requests **********************************/
 
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(form)
  const searchForm = form.elements.query.value 
  
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchForm}&appid=ca452ec3ab9eac3f9df94887f4330a2a&units=metric`);
  main(res.data.coord);
  currentDay(res.data);
 

  
  form.elements.query.value = ''; 
  
 
})



const main = async (userRequest) => {
  const {lon, lat} = userRequest;
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,minutelyp&appid=ca452ec3ab9eac3f9df94887f4330a2a&units=metric`);
  weeklyWeather(response.data)
  
  
}

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

   
}
 /************************  font awsome icons **********************/
const array = [
  {
    
    apiDescription: 'Clouds',
    img: '<i class="fas fa-cloud"></i>',
  },
  {
    
    apiDescription: 'Thunderstorm',
    img: '<i class="fas fa-bolt"></i>'

  },
  {
    
    apiDescription: 'Clear',
    img: '<i class="fas fa-sun"></i>',
  },
  {
    
    apiDescription: 'Drizzle', 
    img: '<i class="fas fa-cloud-rain"></i>'
  },
  {
    
    apiDescription: 'Rain', 
    img: '<i class="fas fa-cloud-showers-heavy"></i>'
  },
  {
    
    apiDescription: 'Few clouds',
    img: '<i class="fas fa-cloud-sun"></i>'
  },
  {
    name: 'moon',
    img: '<i class="fas fa-moon"></i>'
  },
  {
    
    apiDescription:'Snow',
    img: '<i class="fas fa-snowflake"></i>'
  }
]
/*************************************  weather data for all week ************************************/

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





