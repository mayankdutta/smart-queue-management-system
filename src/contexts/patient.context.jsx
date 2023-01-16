import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'

import { Backend } from "../backendData";
const LINK = Backend.link;

export const PatientContext = createContext({
  userPatients: [], 
  setUserPatients: () => null

});

export const PatientProvider = ({ children }) => {
  const value = {}

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
