"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ShoppingCart, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

const shopItems = [
  {
    id: 1,
    name: "Legendary Card Pack",
    description: "Contains 5 cards with at least 1 guaranteed Legendary card",
    price: 1200,
    discountPrice: 999,
    image: "/placeholder.svg?height=200&width=200",
    category: "packs",
    featured: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Premium Card Pack",
    description: "Contains 5 cards with at least 2 guaranteed Epic cards",
    price: 800,
    discountPrice: null,
    image: "/placeholder.svg?height=200&width=200",
    category: "packs",
    featured: false,
    bestseller: true,
  },
  {
    id: 3,
    name: "Standard Card Pack",
    description: "Contains 5 random cards",
    price: 500,
    discountPrice: null,
    image: "/placeholder.svg?height=200&width=200",
    category: "packs",
    featured: false,
    bestseller: false,
  },
  {
    id: 4,
    name: "Dragon Avatar",
    description: "Exclusive profile avatar with animated effects",
    price: 1500,
    discountPrice: null,
    image: "/placeholder.svg?height=200&width=200",
    category: "cosmetics",
    featured: true,
    bestseller: false,
  },
  {
    id: 5,
    name: "Golden Card Back",
    description: "Premium card back design with gold accents",
    price: 1000,
    discountPrice: 800,
    image: "/placeholder.svg?height=200&width=200",
    category: "cosmetics",
    featured: true,
    bestseller: true,
  },
  {
    id: 6,
    name: "Victory Animation",
    description: "Special animation that plays when you win",
    price: 1200,
    discountPrice: null,
    image: "/placeholder.svg?height=200&width=200",
    category: "cosmetics",
    featured: false,
    bestseller: false,
  },
  {
    id: 7,
    name: "Season Pass",
    description: "Unlock premium rewards throughout the season",
    price: 2500,
    discountPrice: 1999,
    image: "/placeholder.svg?height=200&width=200",
    category: "special",
    featured: true,
    bestseller: true,
  },
  {
    id: 8,
    name: "Starter Bundle",
    description: "Perfect for new players - includes 15 cards and exclusive cosmetics",
    price: 1500,
    discountPrice: 999,
    image: "/placeholder.svg?height=200&width=200",
    category: "special",
    featured: true,
    bestseller: true,
  },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [cart, setCart] = useState<number[]>([])
  const { toast } = useToast()

  const filteredItems = shopItems.filter(
    (item) =>
      activeCategory === "all" || item.category === activeCategory || (activeCategory === "featured" && item.featured),
  )

  const addToCart = (itemId: number) => {
    setCart([...cart, itemId])

    const item = shopItems.find((i) => i.id === itemId)

    toast({
      title: "Added to Cart",
      description: `${item?.name} has been added to your cart.`,
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
            <h1 className="font-heading text-2xl md:text-3xl">Shop</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-accent/50 px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">5,000</span>
            </div>

            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <Car className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/20 p-6 rounded-xl shadow-lg shadow-primary/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 animated-bg"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-40 h-40 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Star className="h-20 w-20 text-primary" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <Badge className="mb-2 bg-primary/20 text-primary">Limited Time Offer</Badge>
                <h2 className="text-2xl font-bold mb-2">Special Bundle: Mythic Collection</h2>
                <p className="text-muted-foreground mb-4">
                  Get 20 premium cards including 3 guaranteed Legendary cards, exclusive avatar, and card back design.
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-muted-foreground line-through">3,500</span>
                    <span className="text-2xl font-bold text-primary ml-2">2,499</span>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => addToCart(0)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Car>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              All Items
            </TabsTrigger>
            <TabsTrigger value="featured" onClick={() => setActiveCategory("featured")}>
              Featured
            </TabsTrigger>
            <TabsTrigger value="packs" onClick={() => setActiveCategory("packs")}>
              Card Packs
            </TabsTrigger>
            <TabsTrigger value="cosmetics" onClick={() => setActiveCategory("cosmetics")}>
              Cosmetics
            </TabsTrigger>
            <TabsTrigger value="special" onClick={() => setActiveCategory("special")}>
              Special Offers
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden h-full bg-gradient-to-br from-background/80 to-background border border-primary/20 shadow-lg shadow-primary/5 card-glow">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  {item.bestseller && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Bestseller</Badge>
                  )}
                  {item.discountPrice && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                      {Math.round((1 - item.discountPrice / item.price) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {item.discountPrice ? (
                        <div>
                          <span className="text-muted-foreground text-sm line-through">{item.price}</span>
                          <span className="text-lg font-bold text-primary ml-2">{item.discountPrice}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">{item.price}</span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/50 text-primary hover:bg-primary/10"
                      onClick={() => addToCart(item.id)}
                    >
                      Add to Cart
                    </Button>
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

// Helper component for the featured card
function Car({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

