import React, { useEffect, useState } from 'react'
import Card from "../card/card"

const Game = (props) => {
    return (

        <div>
            {props.hands.croupier.map((card) => (<img src={card.image} />))}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {props.hands.player.map((card) => (<img src={card.image} />))}
        </div>
    )
}

export default Game
