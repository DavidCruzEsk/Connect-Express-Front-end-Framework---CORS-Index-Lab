import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const New = () => {
    const navigate = useNavigate();
    const [newMember, setNewMember] = useState({
        captainName: '',
        title: '',
        post: '',
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: '',
    });
    const API = import.meta.env.VITE_BASE_URL;

    const handleChange = (e) => {
        console.log(e);
        setNewMember((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    }

    const handleCheckBox = (e) => {
        setNewMember(prevState => {
            const mistakesMade = !prevState.mistakesWereMadeToday;
            return { ...prevState, mistakesWereMadeToday: mistakesMade }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(newMember)
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('Fetch failed');
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error.message);
            })
                
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>New Member</legend>
                <input
                    id='name'
                    type="text"
                    placeholder='Name'
                    name='captainName'
                    value={newMember.captainName}
                    onChange={handleChange}
                    required      
                />
                <br/>
                <input
                    id='title'
                    type="text"
                    placeholder='Title'
                    name='title'
                    value={newMember.title}
                    onChange={handleChange}
                    required
                />
                <br/>
                <textarea
                    id="post"
                    placeholder='Post'
                    name='post'
                    rows='4'
                    cols="50"
                    value={newMember.post}
                    onChange={handleChange}
                    required
                />
                <br/>
                <label htmlFor="mistakes-made">Mistakes made? </label>
                <input
                    id="mistakes-made"
                    type='checkbox'
                    checked={newMember.mistakesWereMadeToday}
                    onChange={handleCheckBox}
                />
                <br/>
                <label htmlFor="since-last-crisis">Days since last crisis: </label>
                <input
                    id="since-last-crisis"
                    placeholder='add number of days'
                    type='text'
                    name='daysSinceLastCrisis'
                    value={newMember.daysSinceLastCrisis}
                    onChange={handleChange}
                    required
                />
                <br/>
                <button type='submit'>SUBMIT</button>
            </fieldset>
        </form>
    );
};

export default New;