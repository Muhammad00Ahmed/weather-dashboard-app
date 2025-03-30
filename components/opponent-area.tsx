"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

export default function OpponentArea() {
  return (
    <div className="h-1/3 bg-black/30 border-b border-yellow-500/20 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-blue-500/50">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-500/20 text-blue-300">OP</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-blue-400">Opponent</div>
            <div className="text-xs text-zinc-500">Rank: Diamond</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/20 text-blue-400 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Active Defense
          </Badge>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-black font-bold h-8 w-8 rounded-full flex items-center justify-center">
              15
            </div>
            <div className="h-2 w-32 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-blue-500 to-blue-400"></div>
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
              <Card className="w-[80px] h-[120px] rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-black border border-blue-500/30 shadow-lg shadow-blue-500/10">
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

