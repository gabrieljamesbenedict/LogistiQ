'use client'

import { useRouter } from 'next/navigation'

//idk, vibecoded refine this
const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        })
        router.push('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Logout
        </button>
    )
}

export default LogoutButton
