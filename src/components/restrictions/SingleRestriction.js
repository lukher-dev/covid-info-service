function SingleRestriction(props) {
    return (
        <li>
            <p className='m-0'>{props.content}</p>
            {props.details &&
                <ul>
                    {props.details.map(detail => {
                        return <li key={detail} className='font-weight-light'>{<small>{detail}</small>}</li>
                    })}
                </ul>
            }
            <hr className='m-2' />
        </li>
    );
}

export default SingleRestriction;
