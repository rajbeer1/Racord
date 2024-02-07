"use client";

import { usemodal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-orogin";
import { useState } from "react";



export const InviteModal = () => {
  const {isOpen,onClose,type,data} =usemodal()
  const origin = useOrigin()
  const {server} =data
  const url = `${origin}/invite/${server?.inviteCode}`

  const ismodelopen = isOpen && type === "invite";
  
  const [copied, setcopied] = useState(false)
  const [loading, setloading] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(url)
    setcopied(true)
    setTimeout(() => {
      setcopied(false)
    }, 1000);
  }
 
 
  return (
    <Dialog open={ismodelopen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            INVITE PEOPLE
          </DialogTitle>
           
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-s font-bold text-zinc-600 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black 
            focus:visible: ring-offset-0"
              value={url}></Input>
            <Button size="icon" onClick={copy}>
              {copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4" />}
              </Button>
          </div>
          
  </div>
      </DialogContent>
    </Dialog>
  )
}