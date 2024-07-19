import axios from "axios";
 
const uat = {
  backend: "http://23.98.94.59:6060/api",
};
 
const prod = {
  backend: "https://csia-dev.myairports.com.my/api",
};
 
export let environment = "uat";
// export let environment = 'prod';
 
const selected = environment === "prod" ? prod : uat;
 
export const backendurl = selected["backend"];
 
export const apiClient = axios.create({
  headers: { "Accept-Language": "en" },
});