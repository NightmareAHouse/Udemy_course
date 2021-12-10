import classes from "../../css/Crad.module.css"

const Card = props => {
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    )
}

export default Card;