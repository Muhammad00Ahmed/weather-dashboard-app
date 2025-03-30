"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const players = [
  { id: 1, name: "GoldenKnight", rank: 1, rating: 2845, wins: 342, losses: 41, winRate: 89, tier: "Grandmaster" },
  { id: 2, name: "CardWizard", rank: 2, rating: 2788, wins: 301, losses: 52, winRate: 85, tier: "Grandmaster" },
  { id: 3, name: "AcePlayer", rank: 3, rating: 2756, wins: 289, losses: 63, winRate: 82, tier: "Grandmaster" },
  { id: 4, name: "RoyalFlush", rank: 4, rating: 2701, wins: 276, losses: 71, winRate: 80, tier: "Master" },
  { id: 5, name: "CardShark", rank: 5, rating: 2654, wins: 245, losses: 82, winRate: 75, tier: "Master" },
  { id: 6, name: "PokerFace", rank: 6, rating: 2598, wins: 231, losses: 89, winRate: 72, tier: "Master" },
  { id: 7, name: "DeckMaster", rank: 7, rating: 2543, wins: 218, losses: 95, winRate: 70, tier: "Diamond" },
  { id: 8, name: "CardKing", rank: 8, rating: 2487, wins: 201, losses: 102, winRate: 66, tier: "Diamond" },
  { id: 9, name: "GameChanger", rank: 9, rating: 2432, wins: 189, losses: 110, winRate: 63, tier: "Diamond" },
  { id: 10, name: "HighRoller", rank: 10, rating: 2376, wins: 175, losses: 118, winRate: 60, tier: "Platinum" },
]

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/game">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-heading text-2xl md:text-3xl">Leaderboard</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search players..."
              className="pl-10 w-[200px]"
            />
          </div>
        </div>

        <Tabs defaultValue="global" className="mb-6">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Top 3 Players */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-12">
          {/* 2nd Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <Card className="bg-gradient-to-br from-background/80 to-background border border-muted p-6 rounded-xl shadow-lg shadow-muted/5 w-full md:w-[200px]">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-20 w-20 border-2 border-muted">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xl">
                      {players[1].name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-muted text-muted-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{players[1].name}</h3>
                <Badge className="bg-muted/20 text-muted-foreground mb-2">{players[1].tier}</Badge>
                <div className="text-muted-foreground text-sm">
                  Rating: <span className="text-foreground">{players[1].rating}</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Win Rate: <span className="text-foreground">{players[1].winRate}%</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <Card className="bg-gradient-to-br from-background/80 to-background border border-primary/30 p-6 rounded-xl shadow-lg shadow-primary/10 w-full md:w-[220px] md:h-[280px]">
              <div className="flex flex-col items-center text-center">
                <Crown className="h-8 w-8 text-primary mb-2" />
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                      {players[0].name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-1">{players[0].name}</h3>
                <Badge className="bg-primary/20 text-primary mb-2">{players[0].tier}</Badge>
                <div className="text-muted-foreground text-sm">
                  Rating: <span className="text-primary">{players[0].rating}</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Win Rate: <span className="text-primary">{players[0].winRate}%</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="order-3"
          >
            <Card className="bg-gradient-to-br from-background/80 to-background border border-amber-500/30 p-6 rounded-xl shadow-lg shadow-amber-500/5 w-full md:w-[200px]">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-20 w-20 border-2 border-amber-500">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-amber-500/20 text-amber-300 text-xl">
                      {players[2].name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-amber-950 rounded-full h-8 w-8 flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{players[2].name}</h3>
                <Badge className="bg-amber-500/20 text-amber-300 mb-2">{players[2].tier}</Badge>
                <div className="text-muted-foreground text-sm">
                  Rating: <span className="text-amber-300">{players[2].rating}</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Win Rate: <span className="text-amber-300">{players[2].winRate}%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Leaderboard Table */}
        <Card className="bg-gradient-to-br from-background/80 to-background border border-primary/20 rounded-xl shadow-lg shadow-primary/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Tier</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Rating</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Win/Loss</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.map((player) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: player.rank * 0.05 }}
                    className="border-b border-muted hover:bg-accent/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {player.rank <= 3 ? (
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                              player.rank === 1
                                ? "bg-primary text-primary-foreground"
                                : player.rank === 2
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-amber-500 text-amber-950"
                            }`}
                          >
                            {player.rank}
                          </div>
                        ) : (
                          <div className="text-muted-foreground font-semibold w-6 text-center mr-2">{player.rank}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="bg-accent text-accent-foreground">{player.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`${
                          player.tier === "Grandmaster"
                            ? "bg-primary/20 text-primary"
                            : player.tier === "Master"
                              ? "bg-purple-500/20 text-purple-300"
                              : player.tier === "Diamond"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {player.tier}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">{player.rating}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-green-400">{player.wins}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-destructive">{player.losses}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">{player.winRate}%</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

