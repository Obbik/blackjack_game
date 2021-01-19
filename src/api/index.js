import axios from 'axios'

const numberOfDecks = 6
export const fetchDeck = () => axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numberOfDecks}`)
export const getCard = (id, amount) => axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${amount}`)