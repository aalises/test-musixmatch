import { h, Component } from "preact";
import * as countdown from "countdown";
import { getLastAlbum } from "../utils/services";
import { defaultDate } from "../utils/utils";

interface ClockState {
    time: string,
    lastReleaseDate: Date
}

export default class Clock extends Component<any, ClockState> {

    state = {
        time: "",
        lastReleaseDate: null
    }

    componentDidMount(){
        if(this.state.lastReleaseDate) return; //If the date has already been set do not perform the call again (not to overload the API)
        getLastAlbum()
            .then(data => this.setState({lastReleaseDate: data},this.cbkDataSet))
            .catch(err => console.log("Error:",err) || this.setState({lastReleaseDate: defaultDate}));
        setInterval(() => this.setTime(),1000);
    }

    cbkDataSet(){
        if(!this.state.lastReleaseDate)  this.setState({lastReleaseDate: defaultDate})
        this.setTime();
    }
    
    setTime(){ this.setState({time: countdown(this.state.lastReleaseDate).toString()}); }

    render() {
      return <h4>{this.state.time}</h4>
    }
  }
