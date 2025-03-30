"use client"

import { useState, useEffect } from "react"

// Mock socket implementation for demo purposes
// In a real app, this would use Socket.io or a similar library
export function useSocket() {
  const [socket, setSocket] = useState<any>(null)
  const [connected, setConnected] = useState(false)
  const [players, setPlayers] = useState([
    {
      id: "player1",
      name: "CardMaster",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Diamond",
      status: "Online",
    },
    {
      id: "player2",
      name: "SpellWeaver",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Platinum",
      status: "In Game",
    },
    {
      id: "player3",
      name: "DeckBuilder",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Gold",
      status: "Online",
    },
    {
      id: "player4",
      name: "StrategyKing",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Diamond",
      status: "Online",
    },
    {
      id: "player5",
      name: "LegendPlayer",
      avatar: "/placeholder.svg?height=32&width=32",
      rank: "Master",
      status: "Away",
    },
  ])

  useEffect(() => {
    // Create a mock socket
    const mockSocket = {
      on: (event: string, callback: Function) => {
        // Store event listeners
        mockSocket.events[event] = callback
        return mockSocket
      },
      off: (event: string) => {
        // Remove event listeners
        delete mockSocket.events[event]
        return mockSocket
      },
      emit: (event: string, data: any) => {
        // Simulate emitting events
        console.log(`Socket emitted ${event}:`, data)
        return mockSocket
      },
      events: {} as Record<string, Function>,
    }

    setSocket(mockSocket)

    // Simulate connection after a delay
    setTimeout(() => {
      setConnected(true)

      // Simulate receiving player updates
      setInterval(() => {
        setPlayers((prev) => {
          const newPlayers = [...prev]
          const randomIndex = Math.floor(Math.random() * newPlayers.length)
          const statuses = ["Online", "In Game", "Away"]
          newPlayers[randomIndex] = {
            ...newPlayers[randomIndex],
            status: statuses[Math.floor(Math.random() * statuses.length)],
          }
          return newPlayers
        })
      }, 10000)
    }, 2000)

    return () => {
      // Cleanup
      setConnected(false)
    }
  }, [])

  return {
    socket,
    connected,
    players,
  }
}

