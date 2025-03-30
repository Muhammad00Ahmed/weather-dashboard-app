"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const cards = [
  { id: 1, name: "Dragon Lord", power: 9, type: "Attack", rarity: "Legendary" },
  { id: 2, name: "Mystic Shield", power: 7, type: "Defense", rarity: "Epic" },
  { id: 3, name: "Arcane Blast", power: 8, type: "Special", rarity: "Epic" },
  { id: 4, name: "Shadow Assassin", power: 6, type: "Attack", rarity: "Rare" },
  { id: 5, name: "Healing Oracle", power: 5, type: "Heal", rarity: "Rare" },
]

export default function GameShowcase() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="relative h-[400px] md:h-[500px] w-full max-w-4xl mx-auto">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute top-1/2 left-1/2"
          initial={{
            x: 0,
            y: -100,
            rotateY: 180,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            x: (index - 2) * 80,
            y: 0,
            rotateY: 0,
            scale: index === 2 ? 1 : 0.9 - Math.abs(index - 2) * 0.1,
            opacity: 1,
            zIndex: 10 - Math.abs(index - 2),
          }}
          transition={{
            delay: index * 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            y: -20,
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
        >
          <Card className="w-[200px] h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-background/80 to-background border border-primary/30 shadow-lg shadow-primary/10 card-glow">
            <div className="h-full w-full p-4 flex flex-col">
              <div className="flex justify-between items-start">
                <div className="text-sm font-semibold">{card.name}</div>
                <div className="text-xs font-bold bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center">
                  {card.power}
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center">
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

                <Badge
                  className={`text-xs ${
                    card.rarity === "Legendary"
                      ? "bg-primary/20 text-primary"
                      : card.rarity === "Epic"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {card.rarity}
                </Badge>
              </div>

              <div className="flex-grow flex items-center justify-center mt-4">
                <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl text-primary font-bold neon-text">{card.name.split(" ")[0][0]}</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="text-sm font-semibold mb-1">{card.name}</div>
                <div className="text-xs text-muted-foreground">
                  {card.type === "Attack"
                    ? "Deal damage to opponent"
                    : card.type === "Defense"
                      ? "Block incoming damage"
                      : card.type === "Special"
                        ? "Unique special ability"
                        : "Restore health points"}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

