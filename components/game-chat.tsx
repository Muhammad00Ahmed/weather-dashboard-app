"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

const initialMessages = [
  { id: 1, sender: "System", content: "Game started. Good luck!", isSystem: true },
  { id: 2, sender: "Opponent", content: "Good luck, have fun!", isSystem: false },
]

export default function GameChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    setMessages([...messages, { id: messages.length + 1, sender: "You", content: newMessage, isSystem: false }])
    setNewMessage("")

    // Simulate opponent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "Opponent",
          content: "Interesting move...",
          isSystem: false,
        },
      ])
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            {message.isSystem ? (
              <div className="bg-yellow-500/10 text-yellow-400 px-3 py-2 rounded-md text-sm max-w-[80%]">
                {message.content}
              </div>
            ) : (
              <div className="flex gap-2">
                {message.sender !== "You" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-zinc-700 text-zinc-300">{message.sender[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`px-3 py-2 rounded-md text-sm max-w-[80%] ${
                    message.sender === "You" ? "bg-yellow-500/20 text-yellow-100" : "bg-zinc-700 text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === "You" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-yellow-500/20 text-yellow-300">Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-yellow-500/20">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-zinc-800 border-zinc-700 focus-visible:ring-yellow-500"
          />
          <Button type="submit" size="icon" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

