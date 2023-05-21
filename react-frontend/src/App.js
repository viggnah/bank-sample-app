import Navigation from "./pages/NavBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import { AuthProvider } from "@asgardeo/auth-react";
import { AsgardeoConfig } from "./constants/config";
import ShareCapital from "./pages/ShareCapital";

function App() {
  return (
    <div className="App">
      <AuthProvider config={AsgardeoConfig} >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/sharecapital" element={<ShareCapital />} ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}


export default App;
