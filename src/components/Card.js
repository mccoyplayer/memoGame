export default function Card(props) {
    return (
        <div 
            className={`card ${props.rotate ? 'rotate': ''}`}
            data-id={props.id} 
            onClick={ () => props.actionRotate(props.id, props.fixed) } 
            data-bind={props.bind}>
            <div className='card--inner'>
                <div className='card--front middle'><i className="fas fa-question"></i></div>
                <div className='card--back middle'><i className={props.symbol}></i></div>
            </div>
        </div>
    )
}
