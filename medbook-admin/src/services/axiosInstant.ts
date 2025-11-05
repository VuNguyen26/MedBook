import axios from "axios";

const domain = "http:localhost:8080";

export const axiosInstant = axios.create({
  baseURL: domain,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstant.interceptors.request.use( request => {
    const accessToken = localStorage.getItem("accessToken")

    if(accessToken === undefined ) 
        console.log("Chua co token");
    
    request.headers.Authorization = `Bearer ${accessToken}`;
    
    return request;
})

export default axiosInstant;