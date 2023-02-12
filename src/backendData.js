export const DEFAULT_COUNTER = 15;
const SERVER_URI = "https://repulsive-cod-miniskirt.cyclic.app";
// const SERVER_URI = "http://localhost:5000";

export const PATIENTS = {
  ALL_PATIENTS: `${SERVER_URI}/patients`,
  PATIENT: `${SERVER_URI}/get_patient`,
  REGISTER: `${SERVER_URI}/register_patient`,
  UPDATE: `${SERVER_URI}/update_patient`,
  DELETE: `${SERVER_URI}/delete_patient`,
}

export const USER = {
  REGISTER: `${SERVER_URI}/singup`,
  LOGIN: `${SERVER_URI}/login`,
}

export const DEFAULT_FORM_FIELDS = {
  name: "",
  age: "",
  weight: "",
  contactNumber: "",
  contactNumberFamilyMember: "",
  address: "",
  doctor: "",
  tokenNumber: "",
  bodyTemperature: "",
  bloodPressure: "",
  bloodType: "",
  oxygenLevel: "",
  description: "",
  typeOfCase: "",
  currentPenalty: "",
  date: "",
  gender: "",
};
