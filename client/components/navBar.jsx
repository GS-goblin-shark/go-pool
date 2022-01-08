import React from 'react';

const NavBar = () => {
    const loggedIn = sessionStorage.getItem('loggedIn')

    const login = () => {
        window.location.href = '/login';
    }

    const logout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    }

    if(!loggedIn){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Go-Pool</a>
                    <div className="navbar-nav">
                        <button className="btn btn-secondary" onClick={login}>Login</button>
                    </div>
                </div>
                </nav>
            </div>
        )
    }
    else{
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Go-Pool</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                    <a className="nav-link" href="/messages">Messages</a>
                </div>
                <div className="navbar-nav" id='logout'>
                    <button id='logout-button' className="btn btn-secondary" onClick= {logout}>Log Out</button>
                </div>
                </div>
            </div>
            </nav>
        </div>
         )
    }


}

export default NavBar;