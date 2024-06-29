import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [logs, setLogs] = useState([]);
    const [errorStatus, setErrorStatus] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3033/personel')
            .then(res => {
                if (!res.ok) {
                    throw Error('Data not found');
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
                setErrorStatus(false);
                setLogs(data);
            })
            .catch(error => {
                console.error(error);
                setErrorStatus(true);
            })
    }, []);

    return (
        <div>
            <h1>
                Welcome!
            </h1>
            { logs.map((log, index) => {
                const { captainName } = log;
                return (
                    <ul key={index}>
                        <Link to={`/${index}`}>
                          <li>{captainName}</li>
                        </Link>
                    </ul>
                )
            }) }
        </div>
    );
};

export default Home;