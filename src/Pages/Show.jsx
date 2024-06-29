import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Show = () => {
    const { index } = useParams();
    const [log, setLog] = useState(null);
    const [errorStatus, setErrorStatus] = useState(false);

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

    return (
        <>
            <h1>Show Page</h1>
            {showGenerator()}
        </>
    );
};

export default Show;