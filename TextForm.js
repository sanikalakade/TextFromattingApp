import React, { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [fontColor, setFontColor] = useState('#000000'); // Default font color
    const [showModal, setShowModal] = useState(true); // State to control modal visibility
    const [isLogin, setIsLogin] = useState(true); // Determines if the modal is for login or register
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
    const [error, setError] = useState(''); // To store error message

    // Close the modal
    const closeModal = () => setShowModal(false);

    // Switch to Register page
    const switchToRegister = () => setIsLogin(false);

    // Switch to Login page
    const switchToLogin = () => setIsLogin(true);

    // Handle Login
    const handleLogin = (event) => {
        event.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const username = event.target.username.value;
        const password = event.target.password.value;

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            setIsLoggedIn(true);
            setShowModal(false);
            setError('');
            props.showAlert("Successfully logged in!", "success");
        } else {
            setError('Invalid credentials! Please check your username and password.');
        }
    };

    // Handle Register
    const handleRegister = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Store user data in localStorage
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        setShowModal(false);
        setError('');
        props.showAlert("Successfully registered and logged in!", "success");
    };

    // Handle Logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setError('');
        props.showAlert("Successfully logged out!", "success");
    };

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success");
    };

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    };

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    };

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    };

    // Text style handlers
    const toggleBold = () => setIsBold(!isBold);
    const toggleItalic = () => setIsItalic(!isItalic);
    const toggleUnderline = () => setIsUnderline(!isUnderline);
    const handleFontSizeChange = (event) => setFontSize(parseInt(event.target.value));
    const handleColorChange = (event) => setFontColor(event.target.value);

    // Text style object
    const textStyle = {
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        textDecoration: isUnderline ? 'underline' : 'none',
        fontSize: `${fontSize}px`,
        color: fontColor,
        backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
    };

    return (
        <>
            {/* Modal for Login/Register */}
            <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isLogin ? 'Login' : 'Register'}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Split the login and register forms into two sections */}
                            <div className="row">
                                {/* Login Form */}
                                {isLogin && (
                                    <div className="col-md-6">
                                        <form onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <input type="text" className="form-control" id="username" placeholder="Enter username" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Login</button>
                                            <button type="button" className="btn btn-link" onClick={switchToRegister}>New here? Register</button>
                                        </form>
                                    </div>
                                )}

                                {/* Register Form */}
                                {!isLogin && (
                                    <div className="col-md-6">
                                        <form onSubmit={handleRegister}>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <input type="text" className="form-control" id="username" placeholder="Enter username" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Register</button>
                                            <button type="button" className="btn btn-link" onClick={switchToLogin}>Already have an account? Login</button>
                                        </form>
                                    </div>
                                )}
                            </div>

                            {/* Display error message */}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Text Form */}
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1 className='mb-4'>{props.heading}</h1>

                {/* Login/Logout Button */}
                {!isLoggedIn ? (
                    <button className="btn btn-primary my-3" onClick={() => setShowModal(true)}>
                        Login / Register
                    </button>
                ) : (
                    <button className="btn btn-danger my-3" onClick={handleLogout}>
                        Logout
                    </button>
                )}

                {/* Toolbar for text formatting options */}
                <div className="mb-3">
                    <button className="btn btn-primary mx-1" onClick={toggleBold} style={{ fontWeight: 'bold' }}>Bold</button>
                    <button className="btn btn-primary mx-1" onClick={toggleItalic} style={{ fontStyle: 'italic' }}>Italic</button>
                    <button className="btn btn-primary mx-1" onClick={toggleUnderline} style={{ textDecoration: 'underline' }}>Underline</button>
                    <label className="mx-2">Font Size:
                        <input type="number" value={fontSize} onChange={handleFontSizeChange} min="10" max="50" className="form-control d-inline-block" style={{ width: '80px' }} />
                    </label>
                    <label className="mx-2">Color:
                        <input type="color" value={fontColor} onChange={handleColorChange} className="form-control d-inline-block" style={{ width: '40px' }} />
                    </label>
                </div>

                {/* Text area with applied styles */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        style={textStyle}
                        id="myBox"
                        rows="8"
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>

                {/* Action buttons */}
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>

            {/* Summary and preview */}
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => element.length !== 0).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((element) => element.length !== 0).length} Minutes read</p>
                <h2>Preview</h2>
                <p style={textStyle}>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    );
}
