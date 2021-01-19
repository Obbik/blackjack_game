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
    console.log(cards)
    setHand(prevState => (
      {
        ...prevState,
        croupier: [...prevState.croupier, cards[0], cards[1]],
        player: [...prevState.player, cards[2], cards[3]]
      }))

  }
  const getCardValue = (value, actualPlayerTotalValue) => {
    if (value == "JACK" || value == "QUEEN" || value == "king") {
      return 10
    }
    else if (value == "ACE") {
      let aceVal = 11
      if (aceVal + actualPlayerTotalValue >= 21) {
        aceVal = 20 - actualPlayerTotalValue;
        aceVal = aceVal < 1 ? 1 : aceVal
        return aceVal
      }
      else {
        return aceVal
      }
    }
    else {
      return value
    }
  }

  const sumHandValues = (array) => {
    for (let i = 0; i < array.length; i++) {
      setValues(
        [getCardValue(Object.values(array[i])[3], values.croupierTotalValue)]
        // .reduce((a, b) => a + b, 0)
      )
    }
  }
  sumHandValues(hand.croupier)
  // console.log(getCardValue("ACE", values.croupierTotalValue))

  useEffect(() => {
    getDeck()
  }, [])
  useEffect(() => {
    if (id) {
      getInitialCards(id)
    }

  }, [id])


  return (

    <div className="App">

      {game ? <Game values={values} hands={hand} /> : null}
      <button onClick={() => setGame(true)}>dil</button>
    </div>
  );
}

export default App;
