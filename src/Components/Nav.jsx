import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <Link to='/'>
                <h1>Captain's Log</h1>
            </Link>
            <ul>
                <Link>
                    <li>Add Crew-member</li>
                </Link>
                <Link>
                    <li>Edit Crew-member</li>
                </Link>
                <Link>
                    <li>About</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Nav;