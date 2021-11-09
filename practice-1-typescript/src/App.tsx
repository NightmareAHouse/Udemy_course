import React, {useState} from 'react';
import AddUser from "./containers/addUser";
import UsersList from "./containers/usersList";

type Props = {
    user: string,
    age: number,
}

function App() {

    const [usersList, setUsersList] = useState<Props[]>([]);

    function addUserHandler (username: string, age: number) {
        console.log("YAS!");
        return setUsersList([...usersList, {user: username, age: age}])
    }

    return (
        <div>
            <AddUser  onAddUser={addUserHandler}/>
            <UsersList  props={usersList}/>
        </div>
    );
}

export default App;
