"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const cards = [
  { id: 1, name: "Ace of Spades", image: "/placeholder.svg?height=200&width=140" },
  { id: 2, name: "King of Hearts", image: "/placeholder.svg?height=200&width=140" },
  { id: 3, name: "Queen of Diamonds", image: "/placeholder.svg?height=200&width=140" },
  { id: 4, name: "Jack of Clubs", image: "/placeholder.svg?height=200&width=140" },
  { id: 5, name: "10 of Hearts", image: "/placeholder.svg?height=200&width=140" },
]

export default function GameShowcase() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="relative h-[300px] md:h-[400px] w-full max-w-4xl mx-auto mt-16">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{
            x: 0,
            y: -100,
            rotateY: 180,
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            x: (index - 2) * 60,
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
          <Card className="w-[140px] h-[200px] rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
            <div className="h-full w-full p-2 flex flex-col">
              <div className="text-xs text-yellow-500 font-semibold">{card.name}</div>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-yellow-300/20 to-amber-500/20 flex items-center justify-center">
                  <span className="text-4xl text-yellow-500">{card.name.split(" ")[0][0]}</span>
                </div>
              </div>
              <div className="text-xs text-right text-yellow-500 font-semibold">{card.name}</div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

