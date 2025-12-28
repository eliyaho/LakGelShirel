"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-neonPink text-neonPink hover:bg-neonPink hover:text-black">
          Join the Madness
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border-2 border-neonGreen">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-neonBlue animate-pulse">
            Nail Your Account!
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-neonYellow">
            <TabsTrigger value="login" className="text-black data-[state=active]:bg-neonOrange">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="text-black data-[state=active]:bg-neonGreen">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4">
              <Input type="email" placeholder="Email" className="bg-black text-neonPink border-neonPink" />
              <Input type="password" placeholder="Password" className="bg-black text-neonBlue border-neonBlue" />
              <Button
                type="submit"
                className="w-full bg-neonGreen text-black hover:bg-black hover:text-neonGreen border border-neonGreen"
              >
                Get Polished!
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form className="space-y-4">
              <Input type="text" placeholder="Name" className="bg-black text-neonYellow border-neonYellow" />
              <Input type="email" placeholder="Email" className="bg-black text-neonPink border-neonPink" />
              <Input type="password" placeholder="Password" className="bg-black text-neonBlue border-neonBlue" />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="bg-black text-neonGreen border-neonGreen"
              />
              <Button
                type="submit"
                className="w-full bg-neonOrange text-black hover:bg-black hover:text-neonOrange border border-neonOrange"
              >
                Join the Color Revolution!
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

