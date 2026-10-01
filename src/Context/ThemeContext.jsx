import { createContext, useState } from "react"

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [tema, setTema] = useState(() => {
        const config = JSON.parse(localStorage.getItem('config'));

        return config?.tema || 'escuro';
    });

    return (
        <ThemeContext.Provider value={{ tema, setTema }}>
            {children}
        </ThemeContext.Provider>
    )
}
