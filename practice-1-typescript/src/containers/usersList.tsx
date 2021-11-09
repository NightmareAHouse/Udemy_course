import React from 'react';
import '../css/cardCss.css'
import '../css/userList.css';

type Props = {
    user: string,
    age: number,
}

const UsersList = (props: { props: Props[] }) => {

    const data = props.props;

    return (
        <div className={'card input'}>
            <ul className={'users'}>
                {data.map((data: Props) => (
                    <li>
                        <text>{data.user} ({data.age} years old)</text>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default UsersList;