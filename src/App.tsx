import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { IframeFlow } from "./pages/IframeFlow/IframeFlow";
import { Home } from "./pages/Home/Home";
import { SMSFlow } from "./pages/SMSFlow/SMSFlow";
import { NotFound } from "./pages/NotFound/NotFound";

import "./App.css";
import { About } from "./pages/About/About";

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iframe-flow" element={<IframeFlow />} />
          <Route path="/sms-flow" element={<SMSFlow />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
