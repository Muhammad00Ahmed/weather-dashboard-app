"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-gradient-to-br from-zinc-800 to-black border border-yellow-500/20 h-full shadow-lg shadow-yellow-500/5 overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4 bg-yellow-500/10 w-16 h-16 rounded-full flex items-center justify-center">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-zinc-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

