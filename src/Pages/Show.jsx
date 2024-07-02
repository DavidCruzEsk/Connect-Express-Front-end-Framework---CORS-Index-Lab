import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Show = () => {
    const { index } = useParams();
    const navigate = useNavigate();
    const [log, setLog] = useState(null);
    const [errorStatus, setErrorStatus] = useState(false);
    const API = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetch(`http://localhost:3033/personel/${index}`)
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
                setLog(data);
            })
            .catch(error => {
                console.log(error.message);
                setErrorStatus(true);
            })
    }, [index]);

    function showPerson() {
        const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis } = log;

        return (
            <ul>
                <li>{"Name: " + captainName}</li>
                <li>{"Title: " + title}</li>
                <li>{"Post: " + post}</li>
                <li>{'Mistakes made today: ' + mistakesWereMadeToday}</li>
                <li>{"Days Since Last Crisis: " + daysSinceLastCrisis}</li>
            </ul>
        );
    }

    function showGenerator() {
        if (errorStatus) {
            return <h1>404: Data not found!</h1>;
        } else if (!log) {
            return <h1>Loading...</h1>;
        } else if (log) {
            return showPerson();
        }
    }

    const handleDelete = () => {
        fetch(`${API}/${index}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) {
                throw Error('Fetch failed');
            } else {
                return res.json();
            }
        })
        .then(data => {
            navigate('/');
        })
        .catch(error => {
            console.error(error.message);
        })
    }

    return (
        <>
            <h1>Show Page</h1>
            {showGenerator()}
            <button>Back</button>
            <Link to={`/${index}/edit`}>
                <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

export default Show;