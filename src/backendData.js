export const DEFAULT_COUNTER = 15;
const SERVER_URI = 'https://repulsive-cod-miniskirt.cyclic.app';
// const SERVER_URI = "http://localhost:5000";

export const PATIENTS = {
  ALL_PATIENTS: `${SERVER_URI}/qstatus`,
  PATIENT: `${SERVER_URI}/get_patient`,
  REGISTER: `${SERVER_URI}/register_patient`,
  UPDATE: `${SERVER_URI}/update_patient`,
  DELETE: `${SERVER_URI}/delete_patient`,
};

export const USER = {
  REGISTER: `${SERVER_URI}/signup`,
  LOGIN: `${SERVER_URI}/login`,
};

export const DEFAULT_FORM_FIELDS = {
  name: '',
  age: '',
  weight: '',
  contactNumber: '',
  contactNumberFamilyMember: '',
  address: '',
  doctor: '',
  tokenNumber: '',
  bodyTemperature: '',
  bloodPressure: '',
  bloodType: '',
  oxygenLevel: '',
  description: '',
  typeOfCase: '',
  currentPenalty: '',
  gender: '',
  date: '',
};

/*


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhcmF6QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc2NTgxNzQ1fQ.3x8WwQQu6I4E0wK9frQbdi0kb09UV30SlDWrfmhhQ8c
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhcmF6QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc2NTgxNzc2fQ.uzd8jokwgjwAoNUJsyFxg98xcIfk3BzXiXBKKtVS8z0


  */
