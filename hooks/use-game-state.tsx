"use client"

import { useState, useCallback } from "react"

// Initial player cards
const initialPlayerCards = [
  { id: 1, name: "Dragon Lord", power: 9, type: "Attack", effect: "Deal 9 damage" },
  { id: 2, name: "Mystic Shield", power: 7, type: "Defense", effect: "Block 7 damage" },
  { id: 3, name: "Arcane Blast", power: 8, type: "Special", effect: "Deal 5 damage + draw a card" },
  { id: 4, name: "Shadow Assassin", power: 6, type: "Attack", effect: "Deal 6 damage" },
  { id: 5, name: "Healing Oracle", power: 5, type: "Heal", effect: "Restore 5 health" },
]

// Initial game state
const initialGameState = {
  started: false,
  gameId: "",
  opponent: {
    id: "",
    name: "",
    avatar: "",
    rank: "",
    health: 20,
  },
  player: {
    id: "",
    name: "",
    avatar: "",
    rank: "",
    health: 20,
  },
  turn: "player",
  round: 1,
  playerHand: initialPlayerCards,
  playedCards: [],
}

export function useGameState() {
  const [gameState, setGameState] = useState(initialGameState)

  // Start a new game
  const startGame = useCallback((gameData: any) => {
    setGameState({
      ...initialGameState,
      started: true,
      gameId: gameData.gameId,
      opponent: gameData.opponent,
      player: gameData.player,
      turn: gameData.turn,
      round: gameData.round || 1,
    })
  }, [])

  // Play a card from the player's hand
  const playCard = useCallback((cardId: number) => {
    setGameState((prevState) => {
      // Find the card in the player's hand
      const cardIndex = prevState.playerHand.findIndex((card) => card.id === cardId)
      if (cardIndex === -1) return prevState

      const card = prevState.playerHand[cardIndex]

      // Remove the card from the player's hand
      const newHand = [...prevState.playerHand]
      newHand.splice(cardIndex, 1)

      // Add the card to the played cards
      const newPlayedCards = [...prevState.playedCards, { ...card, player: "player" }]

      // Apply card effects
      let opponentHealth = prevState.opponent.health
      let playerHealth = prevState.player.health

      if (card.type === "Attack") {
        opponentHealth = Math.max(0, opponentHealth - card.power)
      } else if (card.type === "Heal") {
        playerHealth = Math.min(20, playerHealth + card.power)
      }

      // Return the updated state
      return {
        ...prevState,
        playerHand: newHand,
        playedCards: newPlayedCards,
        opponent: {
          ...prevState.opponent,
          health: opponentHealth,
        },
        player: {
          ...prevState.player,
          health: playerHealth,
        },
      }
    })

    // Simulate opponent's turn after a delay
    setTimeout(() => {
      simulateOpponentTurn()
    }, 2000)
  }, [])

  // Simulate opponent's turn
  const simulateOpponentTurn = useCallback(() => {
    setGameState((prevState) => {
      // Opponent plays a random card
      const opponentCard = {
        id: 100 + Math.floor(Math.random() * 100),
        name: ["Fire Bolt", "Ice Shield", "Lightning Strike", "Dark Magic", "Poison Cloud"][
          Math.floor(Math.random() * 5)
        ],
        power: Math.floor(Math.random() * 5) + 4, // 4-8 power
        type: ["Attack", "Defense", "Special", "Attack", "Attack"][Math.floor(Math.random() * 5)],
        effect: "Opponent card effect",
        player: "opponent",
      }

      // Add the card to the played cards
      const newPlayedCards = [...prevState.playedCards, opponentCard]

      // Apply card effects
      let playerHealth = prevState.player.health

      if (opponentCard.type === "Attack") {
        playerHealth = Math.max(0, playerHealth - opponentCard.power)
      }

      // Return the updated state
      return {
        ...prevState,
        playedCards: newPlayedCards,
        turn: "player",
        player: {
          ...prevState.player,
          health: playerHealth,
        },
      }
    })
  }, [])

  // End the player's turn
  const endTurn = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      turn: "opponent",
    }))

    // Simulate opponent's turn after a delay
    setTimeout(() => {
      simulateOpponentTurn()
    }, 2000)
  }, [simulateOpponentTurn])

  return {
    gameState,
    startGame,
    playCard,
    endTurn,
  }
}

