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
    win: null,
    wallet: 1000,
    round: 0,
    roundOver: true,
    croupierTotalValue: 0,
    playerTotalValue: 0,
    game: false

  })
  const [id, setid] = useState()

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
      if (actualPlayerTotalValue[0] && actualPlayerTotalValue[1] == "ACE") return 21
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

  const startGame = (money) => {
    setValues(prevState => ({ ...prevState, game: true, roundOver: false, win: null }))
    values.roundOver ?
      setValues(prevState => (
        { ...prevState, wallet: prevState.wallet - money, round: prevState + 1 }))
      :
      setValues(prevState => (
        { ...prevState, wallet: prevState.wallet }))
  }


  const checkWinOrLose = (score) => {

    if (score - values.croupierTotalValue < 0) {
      setValues(prevState => ({ ...prevState, win: false }))
    }
    else if (score - values.croupierTotalValue > 0) {
      setValues(prevState => ({ ...prevState, win: true }))
    }
    else if (score - values.croupierTotalValue == 0) {

      setValues(prevState => ({ ...prevState, win: "draw" }))

    }
  }


  const endRound = async () => {
    if (values.game === true) {
      if (values.croupierTotalValue < 17) {
        const { cards } = await drawCard(id, 1)
        setHand(prevState => (
          {
            ...prevState,
            croupier: [...prevState.croupier, cards[0]],
          }))
      }
      setValues(prevState => ({ ...prevState, roundOver: true, round: prevState + 1 }))
    }
  }

  useEffect(() => {
    getDeck()
  }, [])
  useEffect(() => {

    if (values.playerTotalValue > 21) {
      setValues(prevState => ({ ...prevState, win: false }))
    }

  }, [values.playerTotalValue])


  useEffect(() => {
    if (id) {
      getInitialCards(id)
    }
  }, [id])

  useEffect(() => {
    if (values.playerTotalValue > 21) {
      setValues(prevState => ({ ...prevState, win: false }))
    }
    setValues(prevState => (
      {
        ...prevState,
        croupierTotalValue: sumHandValues(hand.croupier),
        playerTotalValue: sumHandValues(hand.player)
      }))
  }, [hand])

  const showResoultMessage = (win) => {
    if (win === null) { return null }
    if (win === true) { return <div>You Win! </div> }
    if (win === false) { return <div>You Lose! </div> }
    if (win === "draw") { return <div>Draw! </div> }
  }
  return (
    <div className="App">
      <h1> {showResoultMessage(values.win)}</h1>
      {values.game ? < Game values={values} hands={hand} /> : null}
      <div className="userButton">
        <p>{values.wallet}</p>
        <p>
          <button
            onClick={() => startGame(100)}>
            startGame
            </button>
          <button onClick={async () => {
            if (values.roundOver !== true) {
              let card = await drawCard(id, 1)
              setHand(prevState => (
                (
                  {
                    ...prevState,
                    player: [...prevState.player, card.cards[0]]
                  })
              ))
            }

          }}> Hit</button>

          <button onClick={() => endRound().then(checkWinOrLose(values.playerTotalValue))}>
            Stand
          </button>

          <button onClick={() => checkWinOrLose(values.playerTotalValue)}>
            Dauble Down
          </button>
        </p>
      </div>
    </div >
  );
}

export default App;
