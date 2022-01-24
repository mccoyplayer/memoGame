import Button from '../components/Button'

export default function MainScreen(props) {

    const levelText = ['Easy', 'Medium', 'Hard'];

    return (
        <div className='mainscreen text-center'>
            <h1 className='mainscreen--title'>Memory Game</h1>
            <div className='mainscreen--menu'>
                <p>Select Level</p>
                <Button label={levelText[props.level]} action={props.changeDifficulty} /> <br />
                <Button label="Start" action={ () => props.setStart(1) } />
            </div>
            <p>Made with <span className='logo-react'><i className="fab fa-react"></i></span></p>
        </div>
    )
}
