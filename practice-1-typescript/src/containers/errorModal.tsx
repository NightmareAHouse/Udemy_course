import React from 'react';
import '../css/cardCss.css'
import '../css/button.css'
import '../css/errorModule.css'

const ErrorModal = (props: ({ title: string, message: string, clearErrorMessage: () => void })) => {

    return (
        <div>
            <div className={'backdrop'}/>
            <div className={'card input modal'}>
                <header className={'header'}>
                    <h2>
                        {props.message}
                    </h2>
                </header>
                <div className={'content'}>
                    <p>
                        {props.title}
                    </p>
                </div>
                <footer className={'actions'}>
                    <button className={'button'} onClick={props.clearErrorMessage}>Okay</button>
                </footer>
            </div>
        </div>
    )
}

export default ErrorModal