import React, { useState, useMemo, useContext, useRef, useEffect } from 'react'
import Image from "next/image";
import { TinderContext } from '../context/TinderContext'
//import Button from '@mui/material/Button'
import { FaUndoAlt } from 'react-icons/fa'
import TinderCard from 'react-tinder-card'

function isWhatPercentOf(numA, numB) {
  return (numA / numB) * 100;
}

const style = {
  tinderText: `text-4xl font-semibold`,
  wrapper: `h-[60rem] w-[30rem] flex flex-col`,
  cardMain: `w-full flex-1 relative flex flex-col justify-center items-center`,
  noMoreWrapper: `flex flex-col justify-center items-center absolute`,
  tinderLogo: `text-5xl text-red-500 mb-4`,
  noMoreText: `text-xl text-white`,
  swipesContainer: `w-full h-full overflow-hidden `,
  btnWrapper: `h-18 w-full flex items-center justify-around py-5  `,
  logo: `object-contain cursor-pointer`,
  icon: `text-3xl text-gray-400 cursor-pointer`,
  smash: `card-smash`,
  pass: `card-pass`,
  tinderCardWrapper: `w-full h-full absolute cursor-pointer `,
  tinderWrapper: `card-transform w-full h-full overflow-hidden bg-no-repeat bg-cover bg-center relative px-1`,
  space: `flex justify-between h-3/4 items-end mb-6`,
  name: `flex text-white text-3xl card-text-shadow font-extrabold items-center px-8 mb-4`,
  age: `ml-4 font-semibold text-xl`,
  walletAddress: `font-bolder text-xl text-white mb-2`,
  reactionsContainer: `flex justify-between w-full px-2 gap-5`,
  buttonContainer: `h-16 w-16 rounded-full flex items-center justify-center cursor-pointer border-2`,
  buttonSymbol: `text-3xl`,
  btnName: `flex text-white text-3xl font-extrabold items-center px-8 mb-4`,
  backColors: `border-white text-white`,
  infoWrapper: `flex flex-col items-center py-5 gap-0.5`,
  infoHeader: `text-lg font-semibold`,
  infoChartWrapper: `flex flex-row w-full h-full items-center justify-center gap-2`,
  infoChart: `flex flex-row w-full h-full max-h-24 md:max-h-32 lg:max-h-screen items-center justify-center gap-2`,
  infoSmashHeader: `font-semibold text-lg text-right`,
  infoPassHeader: `font-semibold text-lg text-left`,
  infoPassSmash: `flex flex-col items-end w-1/3`,
  infoPassBar: ``,
  infoSmashBar: ``,
  infoImageWrapper: `flex flex-col items-center justify-center h-24 md:h-32 aspect-square my-4 rounded-xl `,
  infoImage: `w-full h-full flex items-center justify-center p-0 m-0`,
  infoName: `flex text-white text-1xl font-extrabold items-center mb-4`,
  card_transform: {
    "transform": "rotateZ(-2.75787deg) scale(0.8)",
    "borderRadius": "3.5em",
    "backgroundClip": "content-box"
  },
  card_border: {
    "boxShadow": "0 12.5px 100px -10px rgb(50 50 73 / 40%), 0 10px 10px -10px rgb(50 50 73 / 30%)"
  },

  card_smash_hover: {
    "backgroundColor": "#058355",
    "color": "white"
  },
  card_pass_hover: {
    "backgroundColor": "#961425",
    "color": "white"
  },
  card_smash: {
    "display": "flex",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "MsFlexAlign": "center",
    "alignItems": "center",
    "WebkitBoxPack": "center",
    "MsFlexPack": "center",
    "WebkitJustifyContent": "center",
    "justifyContent": "center",
    "position": "relative",
    "boxSizing": "border-box",
    "WebkitTapHighlightColor": "transparent",
    "backgroundColor": "transparent",
    "outline": "0",
    "border": "4px solid var(--bColor)",
    "margin": "0",
    "borderRadius": "1.25rem",
    "padding": "6px 8px",
    "cursor": "pointer",
    "WebkitUserSelect": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "userSelect": "none",
    "verticalAlign": "middle",
    "MozAppearance": "none",
    "WebkitAppearance": "none",
    "WebkitTextDecoration": "none",
    "textDecoration": "none",
    "color": "var(--bColor)",
    "boxShadow": "0 3px 5px 2px rgba(36, 216, 150 / 30%)",
    "fontWeight": "bold",
    "fontFamily": "'Lato', sans-serif",
    "fontSize": "1.5em",
    "lineHeight": "1.75",
    "textTransform": "uppercase",
    "minWidth": "64px",
    "WebkitTransition": "color 250ms linear",
    "transition": "color 250ms linear",
    "-bColor": "rgb(36, 216, 150)",
    "gap": "0.25em",
    "width": "45%",
    "height": "calc(1.5em + 5vh)",
    "paddingTop": "0.25rem",
    "paddingBottom": "0.25rem"
  },
  card_pass: {
    "display": "flex",
    "WebkitAlignItems": "center",
    "WebkitBoxAlign": "center",
    "MsFlexAlign": "center",
    "alignItems": "center",
    "WebkitBoxPack": "center",
    "MsFlexPack": "center",
    "WebkitJustifyContent": "center",
    "justifyContent": "center",
    "position": "relative",
    "boxSizing": "border-box",
    "WebkitTapHighlightColor": "transparent",
    "backgroundColor": "transparent",
    "outline": "0",
    "border": "4px solid rgb(254, 107, 139)",
    "margin": "0",
    "borderRadius": "1.25rem",
    "padding": "6px 8px",
    "cursor": "pointer",
    "WebkitUserSelect": "none",
    "MozUserSelect": "none",
    "MsUserSelect": "none",
    "userSelect": "none",
    "verticalAlign": "middle",
    "MozAppearance": "none",
    "WebkitAppearance": "none",
    "WebkitTextDecoration": "none",
    "textDecoration": "none",
    "color": "var(--bColor)",
    "boxShadow": "0 3px 5px 2px rgb(255 105 135 / 30%)",
    "fontWeight": "bold",
    "fontFamily": "'Lato', sans-serif",
    "fontSize": "1.5em",
    "lineHeight": "1.75",
    "textTransform": "uppercase",
    "minWidth": "64px",
    "WebkitTransition": "color 250ms linear",
    "transition": "color 250ms linear",
    "-bColor": "rgb(254, 107, 139)",
    "gap": "0.25em",
    "width": "45%",
    "height": "calc(1.5em + 5vh)",
    "paddingTop": "0.25rem",
    "paddingBottom": "0.25rem"
  },
    "@media screen and (min-width: 800px)": {
      "__expression__": "screen and (min-width: 800px)",
      card_smash: {
        "gap": "6px",
        "width": "250px",
        "height": "100px",
        "fontSize": "2em"
      },
      card_pass: {
        "gap": "6px",
        "width": "250px",
        "height": "100px",
        "fontSize": "2em"
      }
    },
    "@media (min-width: 800px)": {
      "__expression__": "(min-width: 800px)",
      card_smash: {
        "margin": "0",
        "marginLeft": "48px"
      },
      card_pass___not_style___not_style: {
        "margin": "0",
        "marginLeft": "48px"
      }
    }
}

const Card = () => {

  const { cardsData, votesData } = useContext(TinderContext)

  const { handleRightSwipe, handleLeftSwipe, handleVotes, currentAccountAddress } = useContext(TinderContext)

  const [currentIndex, setCurrentIndex] = useState(cardsData.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [lastImage, setLastImage] = useState()
  const [lastSmashBar, setLastSmashBar] = useState()
  const [lastPassBar, setLastPassBar] = useState()
  const [lastPassNumber, setLastPassNumber] = useState()
  const [lastSmashNumber, setLastSmashNumber] = useState()
  const [lastName, setLastName] = useState()
  const [currentCard, setCurrentCard] = useState([cardsData])

  const currentIndexRef = useRef(currentIndex)

  const currentCardRef = useRef(currentCard)

  const childRefs = useMemo(
    () =>
      Array(cardsData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cardsData.length]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }


  const canGoBack = currentIndex < cardsData.length - 1
  const canVote = votesData > 0
  const canSwipe = currentIndex >= 0

// set last direction and decrease current index
const swiped = (direction, card, index) => {
  if (!canVote) return
  setLastDirection(direction)
  setLastImage(card.imageUrl)
  setLastName(card.name)
  setLastPassNumber(card.dislikes.length)
  setLastSmashNumber(card.likes.length)
  if (votesData > 0) {
    if (direction === 'right') {
      const voterAmount = votesData--
    // handleVotes(voterAmount);
      updateCurrentIndex(index - 1)
      handleRightSwipe(card, currentAccountAddress, voterAmount)
    }
    if (direction === 'left') {
      const voterAmount = votesData--
      // handleVotes(voterAmount);
      updateCurrentIndex(index - 1)
      handleLeftSwipe(card, currentAccountAddress, voterAmount)
    }
  }
  else {
    const voterAmount = votesData=0
    handleVotes(voterAmount);
  }

}

const outOfFrame = (name, idx) => {
  console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
  // handle the case in which go back is pressed before card goes outOfFrame
  currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  // TODO: when quickly swipe and restore multiple times the same card,
  // it happens multiple outOfFrame events are queued and the card disappear
  // during latest swipes. Only the last outOfFrame event should be considered valid


}

const updateCurrentCard = (val) => {
  setCurrentCard(val)
  currentCardRef.current = val
}

function findByIndex(card, index) {
  return index === currentIndex, card
}

const swipe = async (dir) => {
  if (!canVote) return
  if (currentIndex < cardsData.length) {
    let myCardName = cardsData.find((card, index) => findByIndex(card, index));
    updateCurrentCard(myCardName)
    setLastImage(myCardName.imageUrl)
    setLastName(myCardName.name)
    // take myCardName.dislikes.length / myCardName.likes.length and then 100 - that number and then create it as a percentage and that is the css width
    updateCurrentIndex(currentIndex - 1)
    const dislikesDivide = isWhatPercentOf(myCardName.dislikes.length, myCardName.likes.length)
    const likesDivide = isWhatPercentOf(myCardName.likes.length, myCardName.dislikes.length)

    if (myCardName.dislikes.length > myCardName.likes.length) {
      const PassNumber = 100-dislikesDivide
      const SmashNumber = 100-likesDivide
      setLastPassNumber(PassNumber)
      setLastPassBar(dislikesDivide)
      setLastSmashNumber(SmashNumber)
      setLastSmashBar(likesDivide)
    }
    else {
      const SmashNumber = 100-dislikesDivide
      const PassNumber = 100-likesDivide
      setLastPassNumber(PassNumber)
      setLastPassBar(likesDivide)
      setLastSmashNumber(SmashNumber)
      setLastSmashBar(dislikesDivide)
    }
    if (votesData > 0) {
      if (currentIndex == -1) {
        const newIndex = currentIndex += cardsData.length
        //updateCurrentIndex(currentIndex - 1)
        swiped(dir, myCardName, childRefs[newIndex].current)
        await childRefs[newIndex].current.swipe(dir) // Swipe the card!
      }
     else {

        swiped(dir, myCardName, childRefs[currentIndex].current)
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
     }


    }
    else {
      const voterAmount = votesData=0
      handleVotes(voterAmount);
    }


    // Deduct a point from votes
    const voterAmount = votesData-1;
    handleVotes(voterAmount, currentAccountAddress);

  }
}

// increase current index and show card
const goBack = async () => {
  if (!canGoBack) return
  const newIndex = currentIndex + 1
  updateCurrentIndex(newIndex)
  await childRefs[newIndex].current.restoreCard()
}

  return (

    <div className={style.wrapper}>
      <div className={style.cardMain}>
      <h1 className={style.tinderText}>VoteNFTs</h1>
        <div className={style.noMoreWrapper}>
          {/* <div className={style.noMoreText}>
            Out of cards... Refresh
          </div> */}
        </div>
      {
      canVote ? (

        <div className={style.swipesContainer}>
        {cardsData.map((card, index) => (
          <TinderCard
            card={card}
            key={card.name}
            ref={childRefs[index]}
            className={style.tinderCardWrapper}
            preventSwipe={['up', 'down']}
            onCardLeftScreen={() => outOfFrame(card.name, index)}
            onSwipe={(dir) => swiped(dir, card, index)}>
              <div
              className={style.tinderWrapper}>
              <Image
              alt="Next.js logo"
              className={style.tinderWrapper}
              src={card.imageUrl}
              width={1200}
              height={400}
                />

            <div className={style.space}>
              <div className={style.name}>
                {/* {card.name} */}
                <span className={style.age}>{card.age}</span>
                </div>
                </div>
            </div>
      </TinderCard> ))}
    </div>
    ) : (

<div>
</div>
)
}
  </div>



  {canVote ? (
  <div className={style.btnWrapper}>

        <button onClick={() => swipe('left')} className={style.pass} variant="contained">DISLIKE</button>

      {/* <Button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</Button>; */}

        <button  onClick={() => swipe('right')} className={style.smash} variant="contained">LIKE</button>

    </div>
   ) : (
    <div className={style.btnWrapper}>


    </div>
   ) }
     {canVote ? (
  <div className={style.infoWrapper}>

  {lastName ? (
  <span key={lastName} className={style.infoName}>What others chose for
  <span>&nbsp;{lastName}</span>

  </span>
  ) : (
    <span className={style.infoName}>Swipe or press a button to get started</span>
  )}
  <div className={style.infoChartWrapper}>
    <div className={style.infoChart}>
    <div className={style.infoPassSmash}>
    {lastPassNumber ? (
      <span className={style.infoChartWrapper}>
        Dislike
      </span>
       ) : (
        <span className={style.infoChartWrapper}>

      </span>
        )}
      <div key={lastPassBar} className={style.infoPassBar} style={{borderRadius: `4px`, height: `32px`, backgroundColor: `rgb(254, 107, 139)`, width: `${lastPassBar}`+'%'}}>
      <h2 key={lastPassNumber} className={style.infoPassHeader} >
      {lastPassNumber}
      </h2>
      </div>

    </div>
    </div>
    {lastSmashNumber ? (
    <div className={style.infoImageWrapper} style={{ border: `4px solid #1e88e5`, backgroundSize: `cover`, backgroundPosition:`center`}}>
    <div key={lastImage} className={style.infoImage} style={{ backgroundImage: `url('${lastImage}')`,  backgroundRepeat: `no-repeat`, backgroundSize: `90%`, backgroundPosition: `center center`}}>
    </div>

    </div>
     ) : (
      <div className={style.infoImageWrapper} style={{backgroundSize: `cover`, backgroundPosition:`center`}}>
         </div>
         )}
    <div className={style.infoChart}>
    <div className={style.infoPassSmash}>
    {lastSmashNumber ? (
      <span className={style.infoChartWrapper}>
        Like
      </span>
       ) : (
        <span className={style.infoChartWrapper}>

      </span>
        )}
      <div key={lastSmashBar} className={style.infoSmashBar} style={{borderRadius: `4px`, height: `32px`, backgroundColor: `rgb(36, 216, 150)`, width: `${lastSmashBar}`+'%' }}>
      <h2 key={lastSmashNumber} className={style.infoSmashHeader}>
      {lastSmashNumber}
      </h2>
      </div>

    </div>
    </div>



    </div>

</div>
       ) : (
       <div>
        </div>
     )

}


  {/* {lastDirection ? (
  <h2 key={lastDirection} className={style.name}>
    You swiped {lastDirection}
  </h2>
  ) : (
  <h2 className={style.name}>
    Swipe a card or press a button to get Restore Card button visible!
  </h2>
  )} */}
</div>
)
}

export default Card
