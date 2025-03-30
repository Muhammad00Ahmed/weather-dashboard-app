"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

interface OpponentAreaProps {
  opponent: {
    id: string
    name: string
    avatar: string
    rank: string
    health: number
  }
  isOpponentTurn: boolean
}

export default function OpponentArea({ opponent, isOpponentTurn }: OpponentAreaProps) {
  return (
    <div className="h-1/3 bg-background/30 border-b border-primary/20 backdrop-blur-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-blue-500/50">
            <AvatarImage src={opponent.avatar} />
            <AvatarFallback className="bg-blue-500/20 text-blue-300">{opponent.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-blue-400">{opponent.name}</div>
            <div className="text-xs text-muted-foreground">Rank: {opponent.rank}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isOpponentTurn && <Badge className="bg-blue-500/20 text-blue-400 animate-pulse">Their Turn</Badge>}
          <Badge className="bg-blue-500/20 text-blue-400 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Active Defense
          </Badge>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-primary-foreground font-bold h-8 w-8 rounded-full flex items-center justify-center">
              {opponent.health}
            </div>
            <div className="h-2 w-32 bg-accent rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                style={{ width: `${(opponent.health / 20) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="relative">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${index * 30}px`,
                zIndex: index,
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <Card className="w-[80px] h-[120px] rounded-xl overflow-hidden bg-gradient-to-br from-background/80 to-background border border-blue-500/30 shadow-lg shadow-blue-500/10 card-glow">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-500 font-bold">?</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

