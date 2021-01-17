import axios from 'axios'

const numberOfDecks = 6 
const numberOfCards = 4
export const fetchDeck = () => axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numberOfDecks}`)
export const getCard = (id) => axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${numberOfCards}`)