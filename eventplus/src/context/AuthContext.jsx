import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
    const decod = jwtDecode(theToken);//objeto do payload
    return {role: decod.role, nome: decod.name, token: theToken, userId: decod.jti}
}