import React, { useEffect, useState } from "react"
import './App.css';
import * as api from './api'
import Game from './components/game/game'


const App = () => {

  const [hand, setHand] = useState(
    {
      croupier: [],
      player: []
    })

  const [values, setValues] = useState({
    wallet: 1000,
    round: 0,
    roundOver: true,
    croupierTotalValue: 0,
    playerTotalValue: 0

  })
  const [id, setid] = useState()
  const [game, setGame] = useState(false)


  const getDeck = async () => {
    try {
      const { data } = await api.fetchDeck()
      console.log("id_set")
      setid(data.deck_id)
    } catch (e) {
      console.error(e)
    }
  }
  const drawCard = async (id, amount) => {
    try {
      const { data } = await api.getCard(id, amount)
      return data
    }
    catch (e) {
      console.error(e)
    }
  }
  const getInitialCards = async (id) => {
    const { cards } = await drawCard(id, 4)
    setHand(prevState => (
      {
        ...prevState,
        croupier: [...prevState.croupier, cards[0], cards[1]],
        player: [...prevState.player, cards[2], cards[3]]
      }))

  }
  const getCardValue = (value, actualPlayerTotalValue) => {
    if (value == "JACK" || value == "QUEEN" || value == "KING") {
      return 10
    }
    else if (value == "ACE") {
      let aceVal = 11
      if (actualPlayerTotalValue === 11) return 10
      if (aceVal + actualPlayerTotalValue >= 21) {
        aceVal = 20 - actualPlayerTotalValue;
        aceVal = aceVal < 1 ? 1 : aceVal
        return parseInt(aceVal)
      }
      else {
        return parseInt(aceVal)
      }
    }
    else {
      return value
    }
  }

  const sumHandValues = (hand) => {
    let sum = 0
    for (let i = 0; i < hand.length; i++) {
      sum = sum + parseInt(getCardValue(Object.values(hand[i])[3], values.croupierTotalValue))
    }
    return sum
  }

  useEffect(() => {
    getDeck()
  }, [])

  useEffect(() => {
    if (id) {
      getInitialCards(id)
    }
  }, [id])

  useEffect(() => {
    setValues(prevState => (
      {
        ...prevState,
        croupierTotalValue: sumHandValues(hand.croupier),
        playerTotalValue: sumHandValues(hand.player)
      }))
  }, [hand])

  console.log(hand)

  return (

    <div className="App">
      {game ? <Game values={values} hands={hand} /> : null}

      <div className="userButton">
        <p>{values.wallet}</p>
        <p>
          <button onClick={() => setGame(true)}>dil</button>
          <button onClick={async () => {
            let card = await drawCard(id, 1)
            console.log(card)
            setHand(prevState => (
              (
                {
                  ...prevState,
                  player: [...prevState.player, card.cards[0]]
                })
            ))
          }}> take</button>
        </p>
      </div>
    </div >
  );
}

export default App;
