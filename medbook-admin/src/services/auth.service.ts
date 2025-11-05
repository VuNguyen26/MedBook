import axiosInstant from "./axiosInstant";
import UpdateAuth from "../lib/shared/models/Auth/UpdateAuth"
import AuthReponse from "../lib/shared/models/Auth/AuthReponse";

export const AuthService = {
    getMe : async () =>{
        const response = axiosInstant.get("/getMe")
        return null;
    },

    update: async(data:UpdateAuth):Promise<AuthReponse> =>{
        const response = axiosInstant.post("/update",data)

        return response;
    }
}