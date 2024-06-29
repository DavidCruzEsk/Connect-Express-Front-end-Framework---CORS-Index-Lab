import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <Link to='/'>
                <h1>Captain's Log</h1>
            </Link>
            <ul>
                <Link to='/new'>
                    <li>New Member</li>
                </Link>
                <Link>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Nav;