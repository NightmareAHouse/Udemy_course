import React, {useState} from 'react';
import '../css/cardCss.css';
import '../css/addUser.css';
import '../css/button.css';
import ErrorModal from "./errorModal";

type ErrorType = {
    title: string
    message: string,
}

const AddUser = (props: { onAddUser: (username: string, age: number) => void }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);
    const [error, setError] = useState<ErrorType>();

    const addUserHandler = (event: any) => {
        event.preventDefault();
        if (username.trim().length === 0 || age === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if (age < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser(username, age)
        setUsername('');
        setAge(0);
    }

    const usernameChangeHandler = (event: any) => {
        setUsername(event.target.value)
    }

    const ageChangeHandler = (event: any) => {
        setAge(event.target.value);
    }

    function clearErrorMessage() {
        console.log("tas")
        setError(undefined)
    }

    console.log(error)

    return (
        <div>
            {error && <ErrorModal message={error.message} title={error.title} clearErrorMessage={clearErrorMessage}/>}
            <div className={'card input'}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={username} onChange={usernameChangeHandler}/>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={age} onChange={ageChangeHandler}/>
                    <button type="submit" className={'button'}>Add User</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser;