import Button from "./Button";

export default function FinishScreen(props) {
  return (
    <div className='finishscreen text-center'>
        <h1 className='finishscreen--title'>You win!</h1>
        <Button label="Restart game" action={props.setRestart}/>
    </div>
  );
}