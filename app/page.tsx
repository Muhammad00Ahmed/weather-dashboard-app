import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Award, Shield, Zap } from "lucide-react"
import HeroSection from "@/components/landing/hero-section"
import FeatureCard from "@/components/landing/feature-card"
import GameShowcase from "@/components/landing/game-showcase"
import TestimonialSlider from "@/components/landing/testimonial-slider"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export default function Home() {
  return (
    <div className="min-h-screen animated-bg">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">AR</span>
            </div>
            <span className="font-heading text-xl">Arcane Royale</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Leaderboard
              </Link>
              <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
            </nav>

            <ModeToggle />

            <UserNav />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Game Showcase */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                Experience <span className="text-primary neon-text">Premium</span> Gameplay
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in a world of strategic card battles with stunning visuals and seamless multiplayer
                action
              </p>
            </div>

            <GameShowcase />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                Unmatched <span className="text-primary neon-text">Features</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what makes Arcane Royale the ultimate card gaming experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Real-time Multiplayer"
                description="Challenge friends or random opponents to intense card battles with seamless real-time gameplay"
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-primary" />}
                title="AI-Powered Gameplay"
                description="Train against advanced AI opponents or get smart deck recommendations based on your play style"
              />
              <FeatureCard
                icon={<Award className="h-8 w-8 text-primary" />}
                title="Competitive Rankings"
                description="Climb the global leaderboards and earn prestigious achievements as you master your skills"
              />
            </div>

            <div className="mt-16 text-center">
              <Link href="/features">
                <Button variant="outline" className="group">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                What Players <span className="text-primary neon-text">Say</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied players already competing in Arcane Royale
              </p>
            </div>

            <TestimonialSlider />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-background/80 to-background border-primary/20 p-8 md:p-12 rounded-xl shadow-xl shadow-primary/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 animated-bg"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                  Ready to Experience the Ultimate Card Game?
                </h2>
                <p className="text-muted-foreground max-w-2xl mb-8 text-lg">
                  Join thousands of players already competing in Arcane Royale. Create your account now and receive an
                  exclusive starter deck.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/sign-up">
                    <Button size="lg" className="font-semibold">
                      Create Free Account
                    </Button>
                  </Link>
                  <Link href="/game/tutorial">
                    <Button variant="outline" size="lg">
                      Try Tutorial
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">AR</span>
                </div>
                <span className="font-heading text-xl">Arcane Royale</span>
              </Link>
              <p className="text-muted-foreground">
                The ultimate multiplayer card game experience with stunning visuals and seamless gameplay.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Arcane Royale. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Discord</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v7.5a2.5 2.5 0 0 0 2.5 2.5H8l2 2 2-2h2.5a2.5 2.5 0 0 0 2.5-2.5V9Z"></path>
                  <path d="M9 9h.01"></path>
                  <path d="M15 9h.01"></path>
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

