"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Trophy, Swords, Shield, Crown, Search, UserPlus, Sparkles } from "lucide-react"

interface GameLobbyProps {
  onStartGame: () => void
  players?: any[]
  connected?: boolean
}

export default function GameLobby({ onStartGame, players = [], connected = false }: GameLobbyProps) {
  const [gameMode, setGameMode] = useState("quickMatch")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlayers = players.filter((player) => player?.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center">
      <motion.h1
        className="font-heading text-4xl md:text-5xl mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Game Lobby
      </motion.h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-background/80 to-background border border-primary/20 p-8 rounded-xl shadow-xl shadow-primary/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 animated-bg"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8 text-center">Select Game Mode</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`bg-accent/50 border ${gameMode === "quickMatch" ? "border-primary" : "border-primary/30"} rounded-lg p-6 cursor-pointer card-glow`}
                    onClick={() => setGameMode("quickMatch")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Swords className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Quick Match</h3>
                        <p className="text-muted-foreground mb-4">
                          Play against a random opponent with similar skill level
                        </p>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                          2 minute wait time
                        </Badge>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`bg-accent/50 border ${gameMode === "ranked" ? "border-primary" : "border-primary/30"} rounded-lg p-6 cursor-pointer card-glow`}
                    onClick={() => setGameMode("ranked")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Ranked Match</h3>
                        <p className="text-muted-foreground mb-4">
                          Compete for leaderboard position and seasonal rewards
                        </p>
                        <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Requires Level 5+</Badge>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`bg-accent/50 border ${gameMode === "tournament" ? "border-primary" : "border-primary/30"} rounded-lg p-6 cursor-pointer card-glow`}
                    onClick={() => setGameMode("tournament")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Crown className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Tournament</h3>
                        <p className="text-muted-foreground mb-4">
                          Join a bracket-style tournament with multiple players
                        </p>
                        <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                          Next starts in 15 min
                        </Badge>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`bg-accent/50 border ${gameMode === "practice" ? "border-primary" : "border-primary/30"} rounded-lg p-6 cursor-pointer card-glow`}
                    onClick={() => setGameMode("practice")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Practice AI</h3>
                        <p className="text-muted-foreground mb-4">
                          Train against AI opponents with adjustable difficulty
                        </p>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Available Now</Badge>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto">
                  <Button className="font-semibold" onClick={onStartGame}>
                    <Swords className="mr-2 h-4 w-4" />
                    Start Game
                  </Button>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Private Room
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-background/80 to-background border border-primary/20 p-6 rounded-xl shadow-xl shadow-primary/5 h-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Online Players</h3>
                  <Badge
                    variant={connected ? "default" : "outline"}
                    className={connected ? "bg-green-500/20 text-green-400" : ""}
                  >
                    {connected ? "Connected" : "Connecting..."}
                  </Badge>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search players..."
                    className="pl-10"
                  />
                </div>

                <div className="flex-grow overflow-y-auto max-h-[400px] -mx-2 px-2">
                  {filteredPlayers.length > 0 ? (
                    <div className="space-y-2">
                      {filteredPlayers.map((player, index) => (
                        <div
                          key={player.id || index}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={player.avatar || "/placeholder.svg?height=32&width=32"} />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {player.name?.[0] || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{player.name || `User ${index + 1}`}</div>
                              <div className="text-xs text-muted-foreground">{player.rank || "Unranked"}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {player.status || "Online"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                      <Users className="h-12 w-12 mb-4 opacity-20" />
                      <p>No players found</p>
                      <p className="text-sm">Try a different search term</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Deck Suggestions
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-accent/50 border border-primary/20 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Online Players
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-green-400">1,243 players</span>
          </div>
        </Card>

        <Card className="bg-accent/50 border border-primary/20 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Swords className="h-4 w-4 text-primary" />
            Active Games
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-blue-400">328 matches</span>
          </div>
        </Card>

        <Card className="bg-accent/50 border border-primary/20 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Your Stats
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-primary">Win rate: 68%</span>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

