import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
                    //a função que valida o token
    const decoded = jwtDecode(theToken) // objeto do payload

    return { role: decoded.role, name: decoded.name, token: theToken, UserId: decoded.jti}
}