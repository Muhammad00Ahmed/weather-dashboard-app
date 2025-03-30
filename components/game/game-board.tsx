"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti"

interface GameBoardProps {
  playedCards: any[]
}

export default function GameBoard({ playedCards }: GameBoardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Trigger confetti when a card is played
    if (playedCards.length > 0 && isClient) {
      const lastCard = playedCards[playedCards.length - 1]

      if (lastCard.player === "player") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7, x: 0.5 },
        })
      }
    }
  }, [playedCards, isClient])

  if (!isClient) return null

  return (
    <div className="flex-grow relative">
      {/* Game Board */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full border-2 border-primary/30 flex items-center justify-center neon-border">
          <div className="w-[200px] h-[200px] rounded-full border border-primary/20 flex items-center justify-center">
            <AnimatePresence>
              {playedCards.map((card) => (
                <motion.div
                  key={card.id}
                  className="absolute"
                  initial={{
                    y: card.player === "player" ? 100 : -100,
                    opacity: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: card.player === "player" ? 0 : 180,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <Card
                    className={`w-[100px] h-[150px] rounded-xl overflow-hidden bg-gradient-to-br from-background/80 to-background border ${
                      card.player === "player" ? "border-primary/30" : "border-blue-500/30"
                    } shadow-lg ${card.player === "player" ? "shadow-primary/10" : "shadow-blue-500/10"} card-glow`}
                  >
                    <div className="h-full w-full p-2 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div
                          className={`text-xs ${
                            card.player === "player" ? "text-primary" : "text-blue-500"
                          } font-semibold`}
                        >
                          {card.name.split(" ")[0]}
                        </div>
                        <Badge
                          className={`text-xs ${
                            card.type === "Attack"
                              ? "bg-destructive/20 text-destructive-foreground"
                              : card.type === "Defense"
                                ? "bg-blue-500/20 text-blue-400"
                                : card.type === "Special"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {card.type}
                        </Badge>
                      </div>

                      <div className="flex-grow flex items-center justify-center">
                        <div
                          className={`w-[40px] h-[40px] rounded-full ${
                            card.player === "player"
                              ? "bg-gradient-to-br from-primary/20 to-primary/5"
                              : "bg-gradient-to-br from-blue-300/20 to-blue-500/20"
                          } flex items-center justify-center`}
                        >
                          <span
                            className={`text-xl ${
                              card.player === "player" ? "text-primary" : "text-blue-500"
                            } font-bold`}
                          >
                            {card.power}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Effects Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {playedCards.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
              className="w-[300px] h-[300px] rounded-full bg-primary/10"
            />
          </div>
        )}
      </div>
    </div>
  )
}

