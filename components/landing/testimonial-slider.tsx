"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Pro Player",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Arcane Royale is by far the most polished card game I've ever played. The animations are smooth, the gameplay is strategic, and the community is amazing.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Casual Gamer",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "I was looking for a game I could play in short bursts throughout the day, and Arcane Royale is perfect. The matchmaking is quick and the games are exciting!",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    role: "Tournament Player",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The depth of strategy in this game is incredible. Every card feels balanced and useful in the right situation. I've been playing for months and still discovering new combos.",
    rating: 4,
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  if (!isClient) return null

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="bg-gradient-to-r from-background/80 to-background border-primary/20 p-8 rounded-xl shadow-lg shadow-primary/5">
            <div className="flex flex-col items-center text-center">
              <div className="flex mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                ))}
                {[...Array(5 - testimonials[current].rating)].map((_, i) => (
                  <Star key={i + testimonials[current].rating} className="h-5 w-5 text-muted-foreground" />
                ))}
              </div>

              <p className="text-lg mb-6 italic">"{testimonials[current].content}"</p>

              <Avatar className="h-12 w-12 mb-2">
                <AvatarImage src={testimonials[current].avatar} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {testimonials[current].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="font-semibold">{testimonials[current].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-background border border-border rounded-full p-2 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-background border border-border rounded-full p-2 shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full transition-all ${current === index ? "bg-primary w-6" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  )
}

