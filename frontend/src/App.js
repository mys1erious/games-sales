import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./features/core/components/Header";



function App() {

    return (
        <Router>
            <Header />
            <div className="body-container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
