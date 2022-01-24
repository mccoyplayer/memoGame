import Button from "./Button";

export default function FinishScreen(props) {
  return (
    <div className='finishscreen text-center'>
        <h1 className='finishscreen--title'>You win!</h1>
        <p>Refresh page for try again</p>
        <Button label="Restart game" action={props.setRestart}/>
    </div>
  );
}
