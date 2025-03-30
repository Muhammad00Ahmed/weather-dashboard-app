"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const playerCards = [
  { id: 1, name: "Ace of Spades", power: 14, type: "Attack", effect: "Deal 10 damage" },
  { id: 2, name: "King of Hearts", power: 13, type: "Defense", effect: "Block next attack" },
  { id: 3, name: "Queen of Diamonds", power: 12, type: "Special", effect: "+2 cards" },
  { id: 4, name: "Jack of Clubs", power: 11, type: "Attack", effect: "Deal 8 damage" },
  { id: 5, name: "10 of Hearts", power: 10, type: "Heal", effect: "Restore 5 health" },
]

export default function PlayerHand() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="h-1/3 bg-black/30 border-t border-yellow-500/20 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold h-8 w-8 rounded-full flex items-center justify-center">
            20
          </div>
          <div className="h-2 w-32 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
            End Turn
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Special Move
          </Button>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="relative h-[180px]">
          {playerCards.map((card, index) => (
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
              <Card className="w-[120px] h-[180px] rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-yellow-500/30 shadow-lg shadow-yellow-500/10 cursor-pointer">
                <div className="h-full w-full p-3 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="text-xs text-yellow-500 font-semibold">{card.name.split(" ")[0]}</div>
                    <Badge
                      className={`text-xs ${
                        card.type === "Attack"
                          ? "bg-red-500/20 text-red-400"
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
                    <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center">
                      <span className="text-2xl text-yellow-500 font-bold">{card.power}</span>
                    </div>
                  </div>

                  <div className="text-xs text-center text-zinc-400 mt-2">{card.effect}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

