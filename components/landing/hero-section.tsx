"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Users } from "lucide-react"

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl">
              The Ultimate <span className="text-primary neon-text">Card Battle</span> Experience
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
              Immerse yourself in a world of strategic card battles with stunning visuals, real-time multiplayer, and
              AI-powered gameplay.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/game">
              <Button size="lg" className="font-semibold">
                <Play className="mr-2 h-4 w-4" />
                Play Now
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-4 w-4" />
                View Leaderboard
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex items-center gap-2"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-primary text-xs font-bold">{i}</span>
                </div>
              ))}
            </div>
            <span className="text-muted-foreground">
              <strong className="text-foreground">10,000+</strong> players online
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

