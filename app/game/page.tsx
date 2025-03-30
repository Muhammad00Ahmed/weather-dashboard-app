"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Settings, X, Crown } from "lucide-react"
import GameChat from "@/components/game/game-chat"
import PlayerHand from "@/components/game/player-hand"
import GameBoard from "@/components/game/game-board"
import OpponentArea from "@/components/game/opponent-area"
import GameLobby from "@/components/game/game-lobby"
import { useToast } from "@/components/ui/use-toast"
import { useGameState } from "@/hooks/use-game-state"
import { useSocket } from "@/hooks/use-socket"

export default function GamePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [chatOpen, setChatOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { gameState, startGame, playCard, endTurn } = useGameState()
  const { socket, connected, players } = useSocket()

  useEffect(() => {
    setIsClient(true)

    // Connect to game server
    if (socket) {
      socket.on("game:start", (data) => {
        startGame(data)
        toast({
          title: "Game Started",
          description: "Your match has begun. Good luck!",
        })
      })

      socket.on("game:update", (data) => {
        // Update game state with server data
        console.log("Game update received:", data)
      })

      socket.on("game:error", (error) => {
        toast({
          title: "Game Error",
          description: error.message,
          variant: "destructive",
        })
      })
    }

    return () => {
      if (socket) {
        socket.off("game:start")
        socket.off("game:update")
        socket.off("game:error")
      }
    }
  }, [socket, toast, startGame])

  const handleStartGame = () => {
    // In a real implementation, this would connect to the server
    // and wait for matchmaking
    startGame({
      gameId: "game_" + Math.random().toString(36).substring(2, 9),
      opponent: {
        id: "opponent_1",
        name: "Challenger",
        avatar: "/placeholder.svg?height=40&width=40",
        rank: "Diamond",
        health: 20,
      },
      player: {
        id: "player_1",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        rank: "Platinum",
        health: 20,
      },
      turn: "player",
      round: 1,
    })

    toast({
      title: "Finding Opponent",
      description: "Connecting to game server...",
    })
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground">
      {!gameState.started ? (
        <GameLobby onStartGame={handleStartGame} players={players} connected={connected} />
      ) : (
        <div className="h-screen flex flex-col">
          {/* Game Header */}
          <div className="bg-background/50 border-b border-primary/20 backdrop-blur-sm p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-heading text-xl">Arcane Royale</h1>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  Round {gameState.round}
                </Badge>
                {gameState.turn === "player" && <Badge className="bg-primary/20 text-primary">Your Turn</Badge>}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => setChatOpen(!chatOpen)}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => router.push("/leaderboard")}
                >
                  <Crown className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex-grow relative overflow-hidden game-board">
            <div className="absolute inset-0 flex flex-col">
              {/* Opponent Area */}
              <OpponentArea opponent={gameState.opponent} isOpponentTurn={gameState.turn === "opponent"} />

              {/* Game Board */}
              <GameBoard playedCards={gameState.playedCards} />

              {/* Player Hand */}
              <PlayerHand
                cards={gameState.playerHand}
                onPlayCard={playCard}
                onEndTurn={endTurn}
                isPlayerTurn={gameState.turn === "player"}
                playerHealth={gameState.player.health}
              />
            </div>

            {/* Chat Sidebar */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  className="absolute top-0 right-0 h-full w-80 bg-background/90 border-l border-primary/20 z-10 backdrop-blur-sm"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="flex justify-between items-center p-4 border-b border-primary/20">
                    <h3 className="font-semibold">Game Chat</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setChatOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <GameChat gameId={gameState.gameId} opponent={gameState.opponent} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}

