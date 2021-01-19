import React, { useEffect, useState } from 'react'
import Card from "../card/card"

const Game = (props) => {
    return (

        <div>
            <div>
                {props.hands.croupier.map((card) => (<img src={card.image} />))}
                <p>{(props.values.croupierTotalValue)}</p>
            </div>
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
            <div>
                <p>{(props.values.playerTotalValue)}</p>
                {props.hands.player.map((card) => (<img src={card.image} />))}
            </div>
        </div>
    )
}

export default Game
