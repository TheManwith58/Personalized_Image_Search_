import React from 'react';

const LoginPage = () => {
    return (
        <div style={styles.pageContainer}>
            <div style={styles.loginBox}>
                <h2>Welcome to Image Searcher</h2>
                <p style={{color: '#e0e0e0'}}>Please log in to continue</p>
                
                <a href="http://localhost:5000/auth/google" style={{...styles.button, ...styles.google}}>
                    Login with Google
                </a>
                
                <a href="http://localhost:5000/auth/github" style={{...styles.button, ...styles.github}}>
                    Login with GitHub
                </a>
            </div>
        </div>
    );
};

// Updated styles
const styles = {
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 40px)',
    },
    loginBox: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: 'rgba(10, 20, 30, 0.9)', // Dark transparent box
        border: '1px solid #ff00ff', // Pink border
        boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)', // Pink glow
        borderRadius: 0,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 20px',
        margin: '10px 0',
        fontSize: '16px',
        color: '#fff',
        borderRadius: 0,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: '1px solid',
        fontFamily: "'Orbitron', sans-serif",
    },
    google: {
        backgroundColor: '#4285F4',
        borderColor: '#4285F4',
    },
    github: {
        backgroundColor: '#333',
        borderColor: '#00ffff', // Cyan border for GitHub
    }
};

export default LoginPage;