import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const [member, setMember] = useState({
        captainName: '',
        title: '',
        post: '',
        mistakesWereMadeToday: false,
        daysSinceLastCrisis: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`${API}/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('Fetch failed')
                } else {
                    return res.json();
                }
            })
            .then(data => {
                console.log('Edit Page: ',data);
                setMember(prevState => data);
            })
            .catch(error => {
                console.error(error.message);
            })
    }, [id]);

    const handleChange = (e) => {
        // console.log(e);
        setMember(prevState => {
            return { ...prevState, [e.target.name ]: e.target.value }
        });
    }

    const handleCheckBox = (e) => {
        setMember(prevState => {
            const mistakeMade = !prevState.mistakesWereMadeToday;
            return { ...prevState, mistakesWereMadeToday: mistakeMade };
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(member)
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('Fetch failed');
                } else {
                    res.json();
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error.message);
            })
        navigate(`/${id}`);
    }

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>New Member</legend>
                    <input
                        id='name'
                        type="text"
                        placeholder='Name'
                        name='captainName'
                        value={member.captainName}
                        onChange={handleChange}
                        required      
                    />
                    <br/>
                    <input
                        id='title'
                        type="text"
                        placeholder='Title'
                        name='title'
                        value={member.title}
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
                        value={member.post}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                    <label htmlFor="mistakes-made">Mistakes made? </label>
                    <input
                        id="mistakes-made"
                        type='checkbox'
                        checked={member.mistakesWereMadeToday}
                        onChange={handleCheckBox}
                    />
                    <br/>
                    <label htmlFor="since-last-crisis">Days since last crisis: </label>
                    <input
                        id="since-last-crisis"
                        placeholder='add number of days'
                        type='text'
                        name='daysSinceLastCrisis'
                        value={member.daysSinceLastCrisis}
                        onChange={handleChange}
                        required
                    />
                    <br/>
                    <button type='submit'>SUBMIT</button>
                </fieldset>
            </form>
            <Link to={`/${id}`}>
                <button>Back</button>
            </Link>
            
        </>
    );
};

export default Edit;