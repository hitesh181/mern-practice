import React from "react"
import { useNavigate, Navigate, NavLink } from "react-router-dom"
export default function Navbar(){



    return(
        <div className="nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">MERN</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse ms-auto" id="navbarNav">
                            <ul className="navbar-nav ">
                            <li className="nav-item active">
                               <a className="nav-link" href='/read'><NavLink to='/read'></NavLink>All Posts</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href='/register'><NavLink to='/register'></NavLink>register</a>
                            </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}