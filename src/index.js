import React from "react"; 
import ReactDOM from "react-dom"; 
import { Provider, connect } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause} from '@fortawesome/free-solid-svg-icons';
import { faRotate} from '@fortawesome/free-solid-svg-icons';



//Redux

const initialState = {
  break: 5,
  session: 25,
  minutes: 25,
  seconds: 0,
  label: 'Session',
  running: false
}

const PLAY_PAUSE = 'Play_Pause';
const RESET = 'Reset';
const BREAK_DEC = 'Break_Dec';
const BREAK_INC = 'Break_Inc';
const SESSION_DEC = 'Session_Dec';
const SESSION_INC = 'Session_Inc';
const TICK = 'Tick';

const playPause = () => {
  return {
    type: PLAY_PAUSE
  }
}

const reset = () => {
  return {
    type: RESET
  }
}

const breakDecrement = () => {
  return {
    type: BREAK_DEC
  }
}

const breakIncrement = () => {
  return {
    type: BREAK_INC
  }
}

const sessionDecrement = () => {
  return {
    type: SESSION_DEC
  }
}

const sessionIncrement = () => {
  return {
    type: SESSION_INC
  }
}

const tick = () => {
  return {
    type: TICK
  };
};


let breakResult = initialState.break;
let sessionResult = initialState.session;


const clockReducer = (state = initialState, action) => {
  

  switch (action.type) {
    case BREAK_DEC:
      if (state.running) {
        return state;
      } else {
        if (state.break > 1) {
          breakResult -= 1;
          return {
            ...state,
            break: breakResult
          }
        } else {
          return state
        }
      }
      
      case BREAK_INC:
      if (state.running) {
        return state;
      } else {
        if (state.break < 60) {
          breakResult += 1;
          return {
            ...state,
            break: breakResult
          }
        } else {
          return state
        }
      }
      
      case SESSION_DEC:
      if (state.running) {
        return state;
      } else {
        if (state.session > 1) {
          sessionResult -= 1;
          return {
            ...state,
            session: sessionResult,
            minutes: sessionResult
          }
        } else {
          return state
        }
      }
      
      case SESSION_INC:
      if (state.running) {
        return state;
      } else {
        if (state.session < 60) {
          sessionResult += 1;
          return {
            ...state,
            session: sessionResult,
            minutes: sessionResult,
            seconds: 0
          }
        } else {
          return state
        }
      }
      
      
   case PLAY_PAUSE:
      return {
        ...state,
        running: !state.running
      }; 
      
    
      
    case RESET:
      sessionResult = initialState.session;
      breakResult = initialState.break;
      return {
        ...state,
        break: 5,
        session: 25,
        minutes: 25,
        seconds: 0,
        label: 'Session',
        running: false
      }
      
      
      
     case TICK:
      if (state.running && state.seconds === 0) {
        if (state.minutes === 0) {
          if (state.label === "Session") {
            return {
            ...state,
            label: 'Break',
            minutes: state.break,
            seconds: 0
          }
            
         } else {
           return {
            ...state,
            label: 'Session',
            minutes: state.session,
            seconds: 0
          }
         }
          
        } else {
          return {
            ...state,
            minutes: state.minutes - 1,
            seconds: 59
          };
        }
      } else if (state.running) {
        return {
          ...state,
          seconds: state.seconds - 1
        };
      } else {
        return state;
      }
      
    
      
      
      
    default:
      return state;

  }
}



const store = createStore(clockReducer);



//React

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleBreakDec = this.handleBreakDec.bind(this);
    this.handleBreakInc = this.handleBreakInc.bind(this);
    this.handleSessionDec = this.handleSessionDec.bind(this);
    this.handleSessionInc = this.handleSessionInc.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.minutes == 0 && this.props.seconds == 0 && prevProps.seconds != 0) {
      const audio = document.getElementById("beep");
      if (audio) {
        audio.play();
        audio.addEventListener("ended", () => {
          audio.currentTime = 0;
        });
      }
    }
  }
  
  componentDidMount() {
    this.interval = setInterval(this.props.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  
  handleBreakDec = () => {
    this.props.breakDecrement();
  }
  
  handleBreakInc = () => {
    this.props.breakIncrement();
  }
  
  handleSessionDec = () => {
    this.props.sessionDecrement();
  }
  
  handleSessionInc = () => {
    this.props.sessionIncrement();
  }
  
  handlePlayPause = () => {
    this.props.playPause();
  }
  
  handleReset = () => {
    this.props.reset();
    let audio = document.getElementById("beep");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
  
  
  render() {
    
    let formattedMinutes = String(Math.floor(this.props.minutes)).padStart(2, '0');
    let formattedSeconds = String(this.props.seconds).padStart(2, '0');
    
    return (
      
      <div id='clock' className = 'container'>
        <div id='labels' className='row'>
          <div className='col-6'>
            <h3 id='break-label'>Break Length</h3>
          </div>
          <div className='col-6'>
            <h3 id='session-label'>Session Length</h3>
          </div>
        </div>
        
        <div className='row clock-controls'>
          <div className='col-6'>
            <button onClick = {this.handleBreakDec} id='break-decrement'><FontAwesomeIcon icon={faArrowDown} size="xl" /></button>
            <span id='break-length'>{this.props.break}</span>
            <button onClick = {this.handleBreakInc} id='break-increment'><FontAwesomeIcon icon={faArrowUp} size="xl" /></button>
          </div>
          <div className='col-6'>
            <button onClick = {this.handleSessionDec} id='session-decrement'><FontAwesomeIcon icon={faArrowDown} size="xl" /></button>
            <span id='session-length'>{this.props.session}</span>
            <button onClick = {this.handleSessionInc} id='session-increment'><FontAwesomeIcon icon={faArrowUp} size="xl" /></button>
          </div>
        </div>
        
 
        <div id='display'>
          
          <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
           <h3 id='timer-label'>{this.props.label} :</h3>
           <h1 id='time-left'>{formattedMinutes}:{formattedSeconds}</h1>

            <div id='controls' >
              <button onClick = {this.handlePlayPause} id='start_stop'><FontAwesomeIcon icon={faPlay} size="lg"/> <FontAwesomeIcon icon={faPause} size="xl"/></button>
              <button onClick = {this.handleReset} id='reset'><FontAwesomeIcon icon={faRotate} size="lg"/></button>
            </div>
        </div>
        
      </div>
      
    )
  }
  
}


//React and Redux

const mapStateToProps = (state) => {
  return {
    break: state.break,
    session: state.session,
    minutes: state.minutes,
    seconds: state.seconds,
    label: state.label
  };
};

const mapDispatchToProps = {
  playPause,
  reset,
  tick,
  breakDecrement,
  breakIncrement,
  sessionDecrement,
  sessionIncrement
  
};


const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  document.getElementById('root')
); 