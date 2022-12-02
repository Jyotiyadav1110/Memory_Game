import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "./img/img1.jpg",matched:false},
  {"src": "./img/parrot.jpg",matched:false},
  {"src": "./img/penthor2.jpg",matched:false},
  {"src": "./img/hen.jpg",matched:false},
  {"src": "./img/penthor.jpg",matched:false},
  // {"src": "./img/sparrow.jpg",matched:false},
  // {"src": "./img/lion.jpg",matched:false},
  {"src": "./img/lioneagal.jpg",matched:false},
]

function App() {

const[cards,setCards] = useState([]);
const[turns,setTurns] = useState(0);
const[choiceOne, setChoiceOne] = useState(null);
const[ChoiceTwo, setChoiceTwo] = useState(null);
const[disabled,setDisabled] = useState(false);

  //shuffle cards

  const shuffleCards = ()=>{
    const shuffleCards = [...cardImages,...cardImages]
    .sort(()=>Math.random() - 0.5).map((card)=>({...card, id:Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards)
    setTurns(0)
  }

   //handle a choice
    const handleChoice = (card)=>{
        choiceOne ? setChoiceTwo(card):setChoiceOne(card);
    }


    //compare 2 selected cards
    useEffect(()=>{
      if(choiceOne && ChoiceTwo){
        setDisabled(true)

        if(choiceOne.src === ChoiceTwo.src){
          setCards(prevCards =>{
            return prevCards.map(card => {
              if(card.src === choiceOne.src){
                return {...card, matched:true}
              }else{
                return card
              }
            })
          })
          resetTurn();
        }else{
          setTimeout(()=>resetTurn(),1000)
        }
      }
    },[choiceOne, ChoiceTwo])

console.log(cards);

    //reset choices & increase turn
    const resetTurn = ()=>{
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns =>prevTurns+1);
      setDisabled(false);
    }

 //start a new game automatically
 useEffect(()=>{
  shuffleCards()
 },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className='card-grid'>
        {cards.map(card=>(
        <SingleCard key={card.id} card = {card} handleChoice = {handleChoice}
        flipped = {card === choiceOne || card=== ChoiceTwo || card.matched}
        disabled = {disabled}
        />
      ))}
      </div>
      
    </div>
  );
}

export default App