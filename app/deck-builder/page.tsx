"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Filter, Save, Sparkles } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

const allCards = [
  { id: 1, name: "Dragon Lord", power: 9, type: "Attack", effect: "Deal 9 damage", rarity: "Legendary" },
  { id: 2, name: "Mystic Shield", power: 7, type: "Defense", effect: "Block 7 damage", rarity: "Epic" },
  { id: 3, name: "Arcane Blast", power: 8, type: "Special", effect: "Deal 5 damage + draw a card", rarity: "Epic" },
  { id: 4, name: "Shadow Assassin", power: 6, type: "Attack", effect: "Deal 6 damage", rarity: "Rare" },
  { id: 5, name: "Healing Oracle", power: 5, type: "Heal", effect: "Restore 5 health", rarity: "Rare" },
  { id: 6, name: "Fire Elemental", power: 7, type: "Attack", effect: "Deal 7 damage", rarity: "Epic" },
  { id: 7, name: "Ice Barrier", power: 6, type: "Defense", effect: "Block 6 damage", rarity: "Rare" },
  { id: 8, name: "Lightning Bolt", power: 8, type: "Attack", effect: "Deal 8 damage", rarity: "Epic" },
  { id: 9, name: "Nature's Blessing", power: 4, type: "Heal", effect: "Restore 4 health", rarity: "Common" },
  { id: 10, name: "Dark Ritual", power: 5, type: "Special", effect: "Draw 2 cards", rarity: "Rare" },
  { id: 11, name: "Stone Golem", power: 5, type: "Defense", effect: "Block 5 damage", rarity: "Common" },
  { id: 12, name: "Phoenix Flame", power: 6, type: "Attack", effect: "Deal 6 damage", rarity: "Rare" },
  { id: 13, name: "Water Sprite", power: 3, type: "Heal", effect: "Restore 3 health", rarity: "Common" },
  { id: 14, name: "Earth Shaker", power: 7, type: "Attack", effect: "Deal 7 damage", rarity: "Epic" },
  { id: 15, name: "Wind Whisper", power: 4, type: "Special", effect: "Look at opponent's hand", rarity: "Rare" },
  { id: 16, name: "Celestial Guardian", power: 10, type: "Defense", effect: "Block 10 damage", rarity: "Legendary" },
  { id: 17, name: "Void Walker", power: 8, type: "Attack", effect: "Deal 8 damage", rarity: "Epic" },
  { id: 18, name: "Mana Surge", power: 6, type: "Special", effect: "Play an extra card", rarity: "Epic" },
  { id: 19, name: "Life Drain", power: 5, type: "Attack", effect: "Deal 5 damage and heal 2", rarity: "Rare" },
  {
    id: 20,
    name: "Mind Control",
    power: 7,
    type: "Special",
    effect: "Take control of enemy card",
    rarity: "Legendary",
  },
]

export default function DeckBuilderPage() {
  const [selectedCards, setSelectedCards] = useState<number[]>([1, 2, 3, 4, 5])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const { toast } = useToast()

  const filteredCards = allCards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.effect.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "All" || card.type === activeFilter
    return matchesSearch && matchesFilter
  })

  const toggleCardSelection = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId))

      toast({
        title: "Card Removed",
        description: `Card removed from your deck.`,
      })
    } else {
      if (selectedCards.length < 20) {
        setSelectedCards([...selectedCards, cardId])

        toast({
          title: "Card Added",
          description: `Card added to your deck.`,
        })
      } else {
        toast({
          title: "Deck Full",
          description: "Your deck is already at maximum capacity (20 cards).",
          variant: "destructive",
        })
      }
    }
  }

  const handleAutoBuild = () => {
    // Simulate AI deck building
    const aiSelectedCards = []
    const cardTypes = {
      Attack: { min: 8, max: 10 },
      Defense: { min: 4, max: 6 },
      Special: { min: 2, max: 4 },
      Heal: { min: 2, max: 4 },
    }

    // Add cards by type according to strategy
    for (const [type, counts] of Object.entries(cardTypes)) {
      const typeCards = allCards.filter((card) => card.type === type)
      const count = Math.floor(Math.random() * (counts.max - counts.min + 1)) + counts.min

      // Sort by power and rarity for better selection
      typeCards.sort((a, b) => {
        const rarityValue = {
          Legendary: 4,
          Epic: 3,
          Rare: 2,
          Common: 1,
        }

        return (
          b.power +
          rarityValue[b.rarity as keyof typeof rarityValue] * 2 -
          (a.power + rarityValue[a.rarity as keyof typeof rarityValue] * 2)
        )
      })

      // Select top cards of this type
      for (let i = 0; i < Math.min(count, typeCards.length); i++) {
        if (aiSelectedCards.length < 20 && !aiSelectedCards.includes(typeCards[i].id)) {
          aiSelectedCards.push(typeCards[i].id)
        }
      }
    }

    // Fill remaining slots with random cards
    while (aiSelectedCards.length < 20) {
      const randomCard = allCards[Math.floor(Math.random() * allCards.length)]
      if (!aiSelectedCards.includes(randomCard.id)) {
        aiSelectedCards.push(randomCard.id)
      }
    }

    setSelectedCards(aiSelectedCards)

    toast({
      title: "AI Deck Builder",
      description: "Your optimal deck has been created based on current meta and your play style.",
    })
  }

  const handleSaveDeck = () => {
    // In a real app, this would save to a database
    toast({
      title: "Deck Saved",
      description: `Your deck with ${selectedCards.length} cards has been saved successfully.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/game">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-heading text-2xl md:text-3xl">Deck Builder</h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={handleAutoBuild}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Auto-Build
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSaveDeck}>
              <Save className="h-4 w-4 mr-2" />
              Save Deck
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Cards */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-background/80 to-background border border-primary/20 p-6 rounded-xl shadow-lg shadow-primary/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 animated-bg"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-4">Your Deck ({selectedCards.length}/20)</h2>

                <div className="mb-4 h-2 bg-accent rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
                    style={{ width: `${(selectedCards.length / 20) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  {selectedCards.map((cardId) => {
                    const card = allCards.find((c) => c.id === cardId)!
                    return (
                      <motion.div
                        key={card.id}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                        onClick={() => toggleCardSelection(card.id)}
                      >
                        <Card className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-background/80 to-background border border-primary/30 shadow-md shadow-primary/10 card-glow">
                          <div className="h-full w-full p-2 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div className="text-xs font-semibold truncate max-w-[60%]">
                                {card.name.split(" ")[0]}
                              </div>
                              <div className="text-xs font-bold bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
                                {card.power}
                              </div>
                            </div>

                            <div className="flex-grow flex items-center justify-center">
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
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}

                  {/* Empty slots */}
                  {Array.from({ length: 20 - selectedCards.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="w-full aspect-[2/3] rounded-lg border border-dashed border-primary/20 flex items-center justify-center"
                    >
                      <span className="text-primary/30 text-xs">Empty</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Card Collection */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-background/80 to-background border border-primary/20 p-6 rounded-xl shadow-lg shadow-primary/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold">Card Collection</h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search cards..."
                      className="pl-10"
                    />
                  </div>

                  <Button variant="outline" size="icon" className="border-primary/50 text-primary hover:bg-primary/10">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="All" className="mb-6">
                <TabsList>
                  <TabsTrigger
                    value="All"
                    onClick={() => setActiveFilter("All")}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="Attack"
                    onClick={() => setActiveFilter("Attack")}
                    className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
                  >
                    Attack
                  </TabsTrigger>
                  <TabsTrigger
                    value="Defense"
                    onClick={() => setActiveFilter("Defense")}
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    Defense
                  </TabsTrigger>
                  <TabsTrigger
                    value="Special"
                    onClick={() => setActiveFilter("Special")}
                    className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                  >
                    Special
                  </TabsTrigger>
                  <TabsTrigger
                    value="Heal"
                    onClick={() => setActiveFilter("Heal")}
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Heal
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                    onClick={() => toggleCardSelection(card.id)}
                  >
                    <Card
                      className={`w-full aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-background/80 to-background border ${
                        selectedCards.includes(card.id) ? "border-primary" : "border-primary/30"
                      } shadow-md ${
                        selectedCards.includes(card.id) ? "shadow-primary/30" : "shadow-primary/10"
                      } card-glow`}
                    >
                      <div className="h-full w-full p-3 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div className="text-xs font-semibold truncate max-w-[60%]">{card.name.split(" ")[0]}</div>
                          <div className="text-xs font-bold bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
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
                                  : card.rarity === "Rare"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-zinc-500/20 text-zinc-400"
                            }`}
                          >
                            {card.rarity}
                          </Badge>
                        </div>

                        <div className="flex-grow flex items-center justify-center mt-2">
                          <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <span className="text-xl text-primary font-bold neon-text">
                              {card.name.split(" ")[0][0]}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-center text-muted-foreground mt-2 line-clamp-2">{card.effect}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for search icon
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

