import React, {useState} from 'react';
import axios from 'axios';
import $ from "jquery";

class WeatherData extends React.Component{
    constructor(props){
        super(props);

        this.state={
            location: 'Cluj-Napoca',
        }

        this.changeLocation = this.changeLocation.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeBackground = this.changeBackground.bind(this);

        this.baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
        this.apiVars = `&appid=6b8f1e96ea81f962f732f6d8df882d75&units=metric`;
    };

    changeLocation(){
        //API request
        const url=this.baseUrl+this.state.location+this.apiVars;
        axios.get(url).then((response) => {
            this.setState(response.data)
            this.setState({location:''})
            console.log(this.state)
            this.changeBackground(response.data.main.temp);
        })


    }

    handleSearch(event){
        if(event.key === 'Enter'){
            this.changeLocation();
        }
    }

    componentDidMount() {
        this.changeLocation()
    }

    changeBackground(temp){
        //change background depending on temperature
        let background='';
        if(temp <=-20){
            background = 'radial-gradient(circle, rgba(23,63,144,1) 0%, rgba(16,46,106,1) 100%)'
        }else if(temp <=-10){
            background = 'radial-gradient(circle, rgba(23,140,144,1) 0%, rgba(15,100,103,1) 100%)'
        }else if(temp <=0){
            background = 'radial-gradient(circle, rgba(111,156,152,1) 0%, rgba(73,102,99,1) 100%)'
        }else if(temp <=10){
            background = 'radial-gradient(circle, rgba(147,142,109,1) 0%, rgba(106,110,82,1) 100%)'
        }else if(temp <=15){
            background = 'radial-gradient(circle, rgba(154,158,31,1) 0%, rgba(124,135,23,1) 100%)'
        }else if(temp <=20){
            background = 'radial-gradient(circle, rgba(203,142,24,1) 0%, rgba(158,112,22,1) 100%)'
        }else if(temp <=25){
            background = 'radial-gradient(circle, rgba(194,106,14,1) 0%, rgba(140,76,9,1) 100%)'
        }else if(temp <=30){
            background = 'radial-gradient(circle, rgba(194,69,14,1) 0%, rgba(150,54,12,1) 100%)'
        }else if(temp >30){
            background = 'radial-gradient(circle, rgba(176,3,3,1) 0%, rgba(121,6,6,1) 100%)'
        }
        $(".content").css({
            'background' : background
        })
    }

    render(){
        return(
            <div className="info">
                <div className="search">
                    <input
                        value={this.state.location}
                        type="text"
                        onChange={event=>{this.setState({location: event.target.value})}}
                        placeholder="Enter Location"
                        onKeyDown={this.handleSearch}
                    />
                </div>
                <div className="location">
                    <p>{this.state.name}</p>
                    <div className="icon">
                        {this.state.weather ? <img src={"https://openweathermap.org/img/wn/"+this.state.weather[0].icon+"@2x.png"} alt={this.state.weather[0].main}/> : null}
                    </div>
                </div>
                <div className="current-temp">
                    {this.state.main ? <h1>{parseInt(this.state.main.temp)}°C</h1> : null}
                </div>
                <div className="weather-type">
                    {this.state.weather ? <p>{this.state.weather[0].main}</p> : null}
                </div>
                <div className="extremities">
                    {this.state.main ? <p>{parseInt(this.state.main.temp_max)}°/{parseInt(this.state.main.temp_min)}°</p> : null}
                </div>
            </div>
        )
    }
}

export default WeatherData;