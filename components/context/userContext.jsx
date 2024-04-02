import { createContext, useEffect, useState } from 'react';
const AuthContext = createContext();
import axios from 'axios';
const backendURL = import.meta.env.VITE_URL_BACKEND_DEVELOPMENT;
import io from 'socket.io-client';
// Ensure you connect to the same endpoint as your server
const socket = io(backendURL);
const AuthProvider = ({ children }) => {
  
 const [user, setUser] = useState(null);
 const [errorM, setErrorM] = useState(null);

 useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
 },[])

 const login = async (userData) => {
    try {
        // Attempt to log in via your API
        const response = await axios.post(`${backendURL}/api/users/login`, {
            email: userData.email.toLowerCase(),
            password: userData.password
        });

        // Store the received token in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        setUser(response.data); // Assuming you have a setUser function to update user context/state

        // Listen for token updates (e.g., when logging in from another device)
        socket.on('updateToken', (newToken) => {
            localStorage.setItem('token', JSON.stringify(newToken.token)); // Update the token in local storage
            // Optionally, update any application state or context that stores the token
            // This could involve calling setUser or similar again, depending on your state management
        });

        return "loginSuccess";
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        setErrorM(error.response?.data || "An unexpected error occurred");
    }
};

    const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    };

    const register = async (userData)=>{
       
        try {
            const response = await axios.post(`${backendURL}/api/users`, {
                userName: userData.userName,
                address:userData.address,
                email:userData.email.toLowerCase(),
                password:userData.password,
                confirmPassword:userData.confirmPassword,
                avatar:userData.avatar,
                education:userData.education
            })
           localStorage.setItem('user', JSON.stringify(response.data));
           localStorage.setItem('token', JSON.stringify(response.data.token));
         setUser(response.data);
         return "registerSuccess"
        } catch (error) {
             if (error.code === 11000) {
            // Handle duplicate key error
            setErrorM("Email already registered.");
        } else {
            setErrorM(error.response.data);
        }
        }
    }

    const updateUser = async (userData)=>{
        try {
            setUser(userData)
            const response = await axios.put(`${backendURL}/api/users`, {
                userData
        },{
            headers:{
                Authorization: "Bearer " + JSON.parse(localStorage.getItem('token'))
            }
        })
            setUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
            setErrorM(error.response.data)
        }
    }
    
 return (
 <AuthContext.Provider value={{ user,updateUser, login, logout, register , errorM, setErrorM}}>
    {children}
 </AuthContext.Provider>
 );
};
export { AuthProvider, AuthContext };