import React, { useEffect, useState } from 'react';
import Button from './Button';
import Card from './Card';
import convertToTimer from './../logic/convertTimer';
import arrCardsRand from '../logic/createArrCardsRand';

export default function GameScreen(props) {

  // VARIABLES DE ESTADO
  const [cardsArr, setCardsArr] = useState([]);
  const [moves, setMoves] = useState(0)

  // GENERAR TARJETAS ALEATORIAS INICIALES
  useEffect(() => {
    setCardsArr( arrCardsRand(props.numCards) )
  }, [props.numCards])

  // FUNCION: ROTAR
  const rotate = (id, fixed) => {
    if (fixed === 0) {
      setCardsArr(prevArr => {
        prevArr[id].rotate = true;
        prevArr[id].validating = 1;
        return [...prevArr]
      })
      setTimeout(() => validate(), 500)
    }
  }

  // FUNCION: VALIDAR
  const validate = () => {
    setMoves( moves + 1)
    const validatingCards = cardsArr.filter(card => card.validating === 1)

    if (validatingCards.length === 2) {

      // elementos distintos, retornamos
      if (validatingCards[0].bind !== validatingCards[1].bind) {
        setCardsArr(prevArr => {
          prevArr[validatingCards[0].id].rotate = false;
          prevArr[validatingCards[0].id].validating = 0;
          prevArr[validatingCards[1].id].rotate = false;
          prevArr[validatingCards[1].id].validating = 0;
          return [...prevArr]
        })
      }

      // elementos iguales
      else {
        setCardsArr(prevArr => {
          prevArr[validatingCards[0].id].fixed = 1;
          prevArr[validatingCards[0].id].validating = 0;
          prevArr[validatingCards[1].id].fixed = 1;
          prevArr[validatingCards[1].id].validating = 0;
          return [...prevArr]
        })
      }
    }

    // verificamos que no haya elementos pendientes
    const fixedCards = cardsArr.filter( card => card.fixed === 0).length
    if(fixedCards === 0) {
      props.setFinish(2)
    }

  }

  return (
    <div className='gamescreen'>
      <div className='gamescreen--score grid grid-2'>
        <div className='gamescreen--moves'>
          <p>Moves: {moves}</p>
        </div>
        <div className='gamescreen--time text-right'>
          <p>Time: {convertToTimer(props.time)}</p>
        </div>
      </div>
      <div className='gamescreen--cards grid grid-4'>
        {
          cardsArr
            .sort((a, b) => a.id - b.id)
            .map(card => {
              return <Card
                key={card.id}
                id={card.id}
                rotate={card.rotate}
                symbol={card.symbol}
                fixed={card.fixed}
                bind={card.bind}
                actionRotate={rotate}
              />
            })
        }
      </div>
      <div className='text-center'>
        <Button label="Restart game" action={props.setRestart} />
      </div>
    </div>
  )
}
