import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';


import Dashboard from "../src/pages/login/dashboard";
import LoginPage from "../src/pages/login/login";

import Cookies from 'js-cookie';
import { StrictMode } from "react";

// const cors = require("cors");
// Enable CORS for all routes

function isTokenExists() {
  const authToken = Cookies.get('access_token');
  return authToken !== null;
}
function ProtectedRoute({ element }) {
  return isTokenExists() ? element : <Navigate to="/" />;
}


export default function App1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}>
        </Route>

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <StrictMode>
    {/* <LoginPage /> */}
    <App1 />
  </StrictMode>
);



// root.use(cors());

// root.use(cors());

root.render(<App1 />);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
