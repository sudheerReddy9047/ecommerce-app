import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App";
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
createRoot(document.getElementById('root')).render(<App />)