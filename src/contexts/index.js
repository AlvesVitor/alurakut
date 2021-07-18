import React, { createContext, useState } from "react";
import { Theme } from "../global/theme";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [tema, setTema] = useState(Theme.classico);


    function SelecionaTema(e) {
        setTema(e)
    }

    return (<AuthContext.Provider value={{
        tema,
        SelecionaTema,
    }}>

        {children}

    </AuthContext.Provider>

    );
}

export default AuthProvider;