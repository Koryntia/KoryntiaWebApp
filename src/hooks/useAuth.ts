'use client'
import { useState } from 'react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';

const useAuth = () => {
    const { address, connector, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: addressBalance, isError, isLoading } = useBalance({
        address
    })

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
    };

    const toggleModal = () => {
        setShowModal(!showModal)
        localStorage.setItem('modal', JSON.stringify(showModal))
    }

    const logout = () => {
        disconnect();
        localStorage.removeItem('token');
    };

    return { address, addressBalance, connector, isConnected, login, logout, toggleModal, showModal };
};

export default useAuth;
