    import React, { useState } from 'react';

    const RestrictedAccess = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        setIsLoading(true); // Set loading state

        try {
        // 1. Validate Email (Client-side):
        if (!email.includes('@sggs.ac.in')) { // Basic email validation
            throw new Error("Invalid email format.");
        }

        // 2. Make API Call (Replace with your actual API endpoint):
        const response = await fetch('/api/auth/login', {  // Your API endpoint
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed.'); // Handle server-side errors
        }

        // 3. Handle Successful Login:
        setIsLoggedIn(true); // Update login status
        // Store token or user data (e.g., in localStorage or context):
        localStorage.setItem('token', data.token); // Example: storing a token
        // Redirect or update UI as needed
        window.location.href = "/dashboard"; // Example redirect

        } catch (err) {
        console.error("Login error:", err);
        setError(err.message); // Set the error message to display
        } finally {
        setIsLoading(false); // Reset loading state
        }
    };

    if (isLoggedIn) {
        return <p>You are now logged in!</p>; // Or redirect, render a dashboard, etc.
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Restricted Access</h2>
            <p className="text-gray-700 mb-6 text-center">
            This system is accessible only to college members. Please log in using your college email ID.
            </p>

            <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="College Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" // Added focus styles
                required
            />
            {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:bg-gray-400 disabled:cursor-not-allowed" // Added disabled styles
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? 'Logging in...' : 'Log in'} {/* Show loading state */}
            </button>
            </form>

            <p className="mt-4 text-sm text-gray-500 text-center">
            If you are having trouble logging in, please contact the IT department.
            </p>
        </div>
        </div>
    );
    };

    export default RestrictedAccess;