import {createContext, useContext, useEffect, useState,} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // Load user from localStorage on refresh
    useEffect(()=>{
        const storedUser = localStorage.getItem('user');

        if(storedUser){
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    },[]);


    // LOGIN
    const login = (userData)=>{
        setUser(userData);
        
        localStorage.setItem(

            'user',
            JSON.stringify(userData)
        );
    };

    
    // LOGOUT
    const logout = () =>{
        setUser(null);

        localStorage.removeItem('user');
    }

    return(
        <AuthContext.Provider
        value={{
            user,
            login,
            logout,
            loading,
            setUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

    // Custom Hook
    export const useAuth = ()=>{
        return useContext(AuthContext);
    };

