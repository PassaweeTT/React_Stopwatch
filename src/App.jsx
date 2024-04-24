import React from "react";
import Stopwatch from "./components/stopwatch";
import NavBar from "./components/navBar";
import "./App.css";

const App = () => {
    return (
        <div>
            <NavBar />
            <Stopwatch />
        </div>
    );
};

export default App;
