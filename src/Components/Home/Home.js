import React from 'react'
import { Link } from 'react-router-dom'
const Home = (props) => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Navbar</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>SignUp</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Home