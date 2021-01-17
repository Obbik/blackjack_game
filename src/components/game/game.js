import React, {useEffect,useState} from 'react'
import Card from "../card/card"

const Game = (props) => {

    const [initialHandForUser, setinitialHandForUser] = useState([])
    const [initialHandForCroupier, setinitialHandForCroupier] = useState([])

  
   const getInitialCards = async () =>{
      const {cards} = await props.drawCard()
      const userCards = [cards[0], cards[1]]
      const croupierCards = [cards[2], cards[3]]
      setinitialHandForUser( userCards)
      setinitialHandForCroupier(croupierCards)
   }


   useEffect(()=>{
    getInitialCards()

   },[])
    return (
        
        <div>
            {initialHandForCroupier.map((card)=>(<img src={card.image}/>))}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {initialHandForUser.map((card)=>(<img src={card.image}/>))}
        </div>
    )
}

export default Game
