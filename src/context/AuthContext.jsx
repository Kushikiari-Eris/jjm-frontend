import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/AxiosInstance'
import { BASE_URL } from '../utils/Constant';

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)  // Add loading state

    const getLoggedIn = async () => {
        try {
            const loggedInRes = await axiosInstance.get(`${BASE_URL}/loggedIn`)
            setLoggedIn(loggedInRes.data.loggedIn)
            setRole(loggedInRes.data.role)
        } catch (error) {
            console.error("Error fetching logged-in status:", error)
            setLoggedIn(false)  // If there's an error, consider the user not logged in
            setRole(null)
        } finally {
            setLoading(false)  // Set loading to false once the request is complete
        }
    }

    useEffect(() => {
        getLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, role, loading, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthContextProvider }
