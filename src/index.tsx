import './index.css';
import React from "react";
import { render } from "react-dom";
import { Toaster } from 'react-hot-toast';
import { App } from "./App";
render(
  <>
    <App />
    <Toaster position="top-center" />
  </>, 
  document.getElementById("root")
);