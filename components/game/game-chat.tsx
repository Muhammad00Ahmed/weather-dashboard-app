"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Smile } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface GameChatProps {
  gameId: string
  opponent: {
    id: string
    name: string
    avatar: string
  }
}

const initialMessages = [
  { id: 1, sender: "system", content: "Game started. Good luck!", timestamp: new Date().toISOString() },
]

const emojis = ["👍", "👏", "❤️", "😂", "😮", "😡", "🔥", "🎉"]

export default function GameChat({ gameId, opponent }: GameChatProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showEmojis, setShowEmojis] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Simulate opponent response
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: opponent.id,
          content: "Good luck, have fun!",
          timestamp: new Date().toISOString(),
        },
      ])
    }, 2000)

    return () => clearTimeout(timer)
  }, [opponent.id])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const newMsg = {
      id: Date.now(),
      sender: "player",
      content: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // In a real app, we would send this to the server
    // socket.emit('chat:message', { gameId, message: newMsg });

    // Simulate opponent response
    setTimeout(() => {
      const responses = [
        "Interesting move...",
        "I see what you're doing there",
        "Hmm, let me think about this",
        "Nice strategy!",
        "You're making this challenging",
      ]

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: opponent.id,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
        },
      ])
    }, 3000)
  }

  const sendEmoji = (emoji: string) => {
    const newMsg = {
      id: Date.now(),
      sender: "player",
      content: emoji,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMsg])
    setShowEmojis(false)

    // In a real app, we would send this to the server
    // socket.emit('chat:emoji', { gameId, emoji });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "player" ? "justify-end" : "justify-start"}`}>
            {message.sender === "system" ? (
              <div className="bg-primary/10 text-primary px-3 py-2 rounded-md text-sm max-w-[80%]">
                {message.content}
              </div>
            ) : (
              <div className="flex gap-2">
                {message.sender !== "player" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={opponent.avatar} />
                    <AvatarFallback className="bg-accent text-accent-foreground">{opponent.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`px-3 py-2 rounded-md text-sm max-w-[80%] ${
                    message.sender === "player"
                      ? "bg-primary/20 text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  } ${message.content.length <= 2 ? "text-2xl px-2" : ""}`}
                >
                  {message.content}
                </div>
                {message.sender === "player" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-primary/20 text-primary">Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-primary/20 relative">
        <AnimatePresence>
          {showEmojis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-0 right-0 p-2 bg-background border border-primary/20 rounded-t-lg shadow-lg flex flex-wrap justify-center gap-2"
            >
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => sendEmoji(emoji)}
                  className="text-2xl hover:bg-accent p-1 rounded-md transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowEmojis(!showEmojis)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-accent/50 border-accent focus-visible:ring-primary"
          />
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

