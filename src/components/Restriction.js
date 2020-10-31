function Restriction(props) {
    return (
        <li>
            <p>{props.content}</p>
            {props.details &&
                <ul>
                    {props.details.map(detail => {
                        return <li className="font-weight-light">{detail}</li>
                    })}
                </ul>
            }
            <hr />
        </li>
    );
}

export default Restriction;
