import './App.css'
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Events from './Components/Events';
import EventState from './context/events/EventState';
import ResultState from './context/Result/ResultState';
import Results from './Components/Results';
import ReportState from './context/Report/ReportState';
import Report from './Components/Report';
import Alert from './Components/Alert';
import { useContext, useEffect, useState } from 'react';
import About from './Components/About';
import LoginType from './Components/LoginType';
import Signup from './Components/Signup';
import LoginState from './context/Login/LoginState';
import Login from './Components/Login';
import CreateReport from './Components/CreateReport';
import CreateResult from './Components/CreateResult';

function App() {

  const [alert, setalert] = useState(null)
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500)
  }

  return (
    <EventState>
      <ResultState>
        <ReportState>
          <LoginState>
            <Router>
              <Navbar />
              <Alert alert={alert} />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Events" element={<Events showAlert={showAlert} />} />
                <Route exact path="/Results" element={<Results />} />
                <Route exact path="/Report" element={<Report />} />
                <Route exact path="/About" element={<About />} />
                <Route exact path="/role" element={<LoginType />} />
                <Route exact path="/createreport" element={<CreateReport showAlert={showAlert} />} />
                <Route exact path="/createresult" element={<CreateResult showAlert={showAlert} />} />
                <Route exact path="/signin" element={<Login showAlert={showAlert} />} />
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              </Routes>
              <Footer />
            </Router>
          </LoginState>
        </ReportState>
      </ResultState>
    </EventState>
  );
}

export default App;
