"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, SkipForward } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PlayerHandProps {
  cards: any[]
  onPlayCard: (cardId: number) => void
  onEndTurn: () => void
  isPlayerTurn: boolean
  playerHealth: number
}

export default function PlayerHand({ cards, onPlayCard, onEndTurn, isPlayerTurn, playerHealth }: PlayerHandProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { toast } = useToast()

  const handlePlayCard = () => {
    if (!selectedCard) return

    if (!isPlayerTurn) {
      toast({
        title: "Not Your Turn",
        description: "Wait for your opponent to finish their turn.",
        variant: "destructive",
      })
      return
    }

    onPlayCard(selectedCard)
    setSelectedCard(null)

    toast({
      title: "Card Played",
      description: "Your card has been played successfully.",
    })
  }

  const handleEndTurn = () => {
    if (!isPlayerTurn) {
      toast({
        title: "Not Your Turn",
        description: "Wait for your opponent to finish their turn.",
        variant: "destructive",
      })
      return
    }

    onEndTurn()

    toast({
      title: "Turn Ended",
      description: "Waiting for opponent's move.",
    })
  }

  return (
    <div className="h-1/3 bg-background/30 border-t border-primary/20 backdrop-blur-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold h-8 w-8 rounded-full flex items-center justify-center">
            {playerHealth}
          </div>
          <div className="h-2 w-32 bg-accent rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
              style={{ width: `${(playerHealth / 20) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary/10"
            onClick={handleEndTurn}
            disabled={!isPlayerTurn}
          >
            <SkipForward className="h-4 w-4 mr-1" />
            End Turn
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
            disabled={!selectedCard || !isPlayerTurn}
            onClick={handlePlayCard}
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Play Card
          </Button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="relative h-[180px]">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute"
                style={{
                  left: `${index * 120}px`,
                  zIndex: hoveredCard === card.id || selectedCard === card.id ? 10 : index,
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: selectedCard === card.id ? -40 : hoveredCard === card.id ? -20 : 0,
                  opacity: 1,
                  scale: selectedCard === card.id ? 1.1 : hoveredCard === card.id ? 1.05 : 1,
                }}
                exit={{ y: -100, opacity: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                onHoverStart={() => setHoveredCard(card.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              >
                <Card className="w-[120px] h-[180px] rounded-xl overflow-hidden bg-gradient-to-br from-background/80 to-background border border-primary/30 shadow-lg shadow-primary/10 cursor-pointer card-glow">
                  <div className="h-full w-full p-3 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="text-xs font-semibold">{card.name.split(" ")[0]}</div>
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
                      <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-2xl text-primary font-bold neon-text">{card.power}</span>
                      </div>
                    </div>

                    <div className="text-xs text-center text-muted-foreground mt-2">{card.effect}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

