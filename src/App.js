import React,{useEffect, useState} from "react"
import './App.css';
import * as api from './api'
import Game from './components/game/game'


const App = () =>{


const [options, setOptions] = useState({
  money: 1000,
  intialCards:[]
})
const [id, setid] = useState(null)
const [game,setGame] = useState(false)


  const getDeck = async () =>{
    try{
    const {data} = await api.fetchDeck()
    setid(data.deck_id)
    } catch(e){
      console.error(e)
    }
  }
  const drawCard = async(id) =>{
    try{
      const {data} = await api.getCard(id)
      return data
    }
    catch(e){
      console.error(e)
    }
  }
  useEffect(()=>{
    getDeck()
    
  },[])


  return ( 

    <div className="App">
      {game ? <Game rules={options} drawCard={()=>drawCard(id)}/>: null}
      <button onClick={()=>setGame(true)}>zacznij</button>
    </div>
  );
}

export default App;
