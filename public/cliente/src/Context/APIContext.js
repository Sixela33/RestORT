// En apiContext.js
import { createContext, useState } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const { clave, setClave } = useState(null);

    const fetchData = async (url, method = 'GET', body = null) => {
        try {
            const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': clave
            },
            body: body ? JSON.stringify(body) : null,
            };

            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(`Error al realizar ${method} request a ${url}`, error);
            throw error;
        }
    };

    return (
        <ApiContext.Provider value={{ fetchData, setClave }}>
            {children}
        </ApiContext.Provider>
    );
};