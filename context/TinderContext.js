import { useState, createContext, useEffect } from 'react'
import { faker } from '@faker-js/faker'


const crypto = require('crypto');
const password =  'fdwsjkhgdasjlkdshfalsg';
const iv = 'geadhgdgtasfrasd';

function sha1(input) {
    return crypto.createHash('sha1').update(input).digest();
}

function password_derive_bytes(password, salt, iterations, len) {
    var key = Buffer.from(password + salt);
    for (var i = 0; i < iterations; i++) {
        key = sha1(key);
    }
    if (key.length < len) {
        var hx = password_derive_bytes(password, salt, iterations - 1, 20);
        for (var counter = 1; key.length < len; ++counter) {
            key = Buffer.concat([key, sha1(Buffer.concat([Buffer.from(counter.toString()), hx]))]);
        }
    }
    return Buffer.alloc(len, key);
}

const encode = async (string) => {
    var key = password_derive_bytes(password, '', 100, 32);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.from(iv));
    var part1 = cipher.update(string, 'utf8');
    var part2 = cipher.final();
    const encrypted = Buffer.concat([part1, part2]).toString('base64');
    return encrypted;
}

const decode = async (string) => {
    var key = password_derive_bytes(password, '', 100, 32);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv));
    var decrypted = decipher.update(string, 'base64', 'utf8');
    decrypted += decipher.final();
    return decrypted;
}

const newId = async (string) => {
  // Make URL safe
  return string.replace(/\+/g, '').replace(/\//g, '').replace(/=+$/, '');
}

const newUserID = async (address) => {
  // encode WalletAddress
  const encodedAddress = await encode(address)
  // strip out special characters
  const userID = await newId(encodedAddress)
  // return the userID
  return userID;
}

export const TinderContext = createContext()

export const TinderProvider = ({ children }) => {

  const [cardsData, setCardsData] = useState([])

  // const [currentUserID, setCurrentUserID] = useState()
  const [currentAccount, setCurrentAccount] = useState()
  const [currentAccountAddress, setCurrentAccountAddress] = useState()
  const [votesData, setVotesData] = useState();
  let arr = []

  useEffect( async() => {
      checkWalletConnection()
      // requestCurrentUserData("0x1a0eA4A609cFAbA7fC4df30C139424198607FD50")
      // requestCardsData("0x1a0eA4A609cFAbA7fC4df30C139424198607FD50")
        // convert the user wallet address to encrypted with special characters removed
        const address = "0x1a0eA4A609cFAbA7fC4df30C139424198607FD50"

        const userID = await newUserID(address)
        requestVoteAmount(address)
        // run state to make it the authenticated current account with userID
        setCurrentAccount(address)
        console.log(userID, "userID")
        setCurrentAccountAddress(address)
        requestToCreateUserProfile(address, faker.name.findName(), userID)

    }, [])

  const checkWalletConnection = async () => {
    try {

        // Once authenticated via metamask wallet grab the users wallet address
          const address = "0x1a0eA4A609cFAbA7fC4df30C139424198607FD50"
          // convert the user wallet address to encrypted with special characters removed
          const userID = await newUserID(address)
          requestCurrentUserData(address)
          requestCardsData(address)
          // run state to make it the authenticated current account with userID
          setCurrentAccount(address)
          requestVoteAmount(address)
          setCurrentAccountAddress(address)
          requestToCreateUserProfile(address, faker.name.findName(), userID)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRightSwipe = async (cardData, currentUserAddress, votesData) => {

    try {
      const userID = await newUserID(currentUserAddress);

      await fetch('/api/saveLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
          likedCards: cardData,
          currentUser: userID,
        }),

      })
      let votesAmount = votesData--
      try {
        await fetch('/api/saveVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
          _id: userID,
          votes: votesAmount
        }),
      })

    } catch (error) {
      console.error(error)
    }
      //requestVoteAmount(userID)
      requestVoteAmount(userID)
      setVotesData(votesAmount)
    } catch (error) {
      console.error(error)
    }

  }

  const requestVoteAmount = async currentacct => {
    try {
      // console.log(userID)

      const userID = await newUserID(currentacct);
      const response = await fetch(
        `/api/fetchVoteAmountData?userID=${userID}`,
      )
      const data = await response.json()
      requestCardsData("0x1a0eA4A609cFAbA7fC4df30C139424198607FD50")
      setVotesData(data.data[0].votes)
    } catch (error) {
      console.error(error)
    }
  }

  const handleVotes = async (votesData) => {

    try {
      console.log(currentAccount)
      let votesAmount = votesData--
      const userID = await newUserID(currentAccount);
      // setVotesData(votesData--)
      await fetch('/api/saveVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
          _id: userID,
          votes:votesAmount
        }),
      })

      requestVoteAmount(userID)
      setVotesData(votesAmount)

    } catch (error) {
      console.error(error)
    }
  }

  const handleLeftSwipe = async (cardData, currentUserAddress, votesData) => {

    try {
      const userID = await newUserID(currentAccount);
      await fetch('/api/saveDislike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
          dislikedCards: cardData,
          // likedCards: cardData,
          currentUser: userID
        }),
      })
      let votesAmount = votesData--
      try {
        await fetch('/api/saveVote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({
          _id: userID,
          votes: votesAmount
        }),
      })

    } catch (error) {
      console.error(error)
    }
      //requestVoteAmount(userID)
      requestVoteAmount(userID)
      setVotesData(votesAmount)
    } catch (error) {
      console.error(error)
    }

  }

  const requestToCreateUserProfile = async (walletAddress, name, newID) => {
    try {
      console.log(newID)
      await fetch(`/api/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name: name,
          _id: newID,
          votes: 10
        }),
      })
    } catch (error) {
      console.error(error)
    }
  }


  const requestCurrentUserData = async walletAddress => {
    try {
      const userID = await newUserID(walletAddress);
      console.log(walletAddress)
      const response = await fetch(
        `/api/fetchCurrentCardsData?userID=${userID}`,
      )
      const data = await response.json()
      // setVotesData(data.data)
      setCurrentAccount(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const requestCardsData = async (activeAccount) => {
    try {
      const userID = await newUserID(activeAccount);
      // console.log("RequestCardsDataNewUserID", userID)
      const response = await fetch(
        `/api/fetchCards?userID=${userID}&activeAccount=${activeAccount}`,
      )
      const data = await response.json()
      setCardsData(data.data)
      // console.log(data.data)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <TinderContext.Provider
      value={{
        cardsData,
        handleRightSwipe,
        handleLeftSwipe,
        handleVotes,
        currentAccount,
        currentAccountAddress,
        votesData
      }}
    >
      {children}
    </TinderContext.Provider>
  )
}
