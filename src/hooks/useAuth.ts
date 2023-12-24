'use client'
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

const useAuth = () => {
    const { address, connector, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
    };

    // const getUserAddress = () => {
    //     const { address, connector, isConnected } = useAccount();
    //     return { address, connector, isConnected }
    // }

    const toggleModal = () => {
        setShowModal(!showModal)
        localStorage.setItem('modal', JSON.stringify(showModal))
    }

    const logout = () => {
        disconnect();
        localStorage.removeItem('token');
    };

    return { address, connector, isConnected, login, logout, toggleModal, showModal };
};

export default useAuth;
