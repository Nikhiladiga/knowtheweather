import React,{Component} from 'react';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//api.openweathermap.org/data/2.5/weather?q=London
const API_key = '3a1e6516062bc66fdb06e850c31c3cb8';

class App extends Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false,
      visible:false
    };
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
  }

  calCelsius(temp){
    let cel = Math.floor(temp-273.15);
    return cel;
  }

  getWeatherIcon(icons,rangeID){
    switch(true){
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm});
        break;
      
      case rangeID>=300 && rangeID<=321:
        this.setState({icon:this.weatherIcon.Drizzle});
        break;

      case rangeID>=500 && rangeID<=531:
        this.setState({icon:this.weatherIcon.Rain});
        break;

      case rangeID>=600 && rangeID<=622:
        this.setState({icon:this.weatherIcon.Snow});
        break;

      case rangeID>=700 && rangeID<=781:
        this.setState({icon:this.weatherIcon.Atmosphere});
        break;

      case rangeID === 800:
        this.setState({icon:this.weatherIcon.Clear});
          break;

      case rangeID>=801 && rangeID<=804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;

      default:
        this.setState({icon:this.weatherIcon.Clouds});
    }
  }


  getWeather = async(e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    if(city){
    const weather_details = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
    const response = await weather_details.json();
    console.log(response);

    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description,
      error:false
    });
    this.getWeatherIcon(this.weatherIcon,response.weather[0].id);
    }else{
      this.setState({error:true});
    }
  };

  showSection = ()=>{
    this.setState({visible:true});
  }

  render(){
    return(
    <div className="App mt-5">
      <Form loadweather={this.getWeather} error={this.state.error} showSection={this.showSection}/>
      {
        this.state.visible?
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon = {this.state.icon}
        />:null
      }
    </div>
  )};
}

export default App;
