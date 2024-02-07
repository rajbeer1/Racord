"use client";

import { usemodal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


export const LeaveserverModal = () => {
  const {isOpen,onClose,type,data} =usemodal()
  const router = useRouter()
  const {server} =data


  const ismodelopen = isOpen && type === "leaveserver";
  
  const [copied, setcopied] = useState(false)
  const [loading, setloading] = useState(false)
  const conirm = async() => {
     try {
       setloading(true)
       await axios.patch(`/api/servers/${server?.id}/leave`)
       onClose()
       router.refresh()
       router.push('/')
     } catch (error) {
      setloading(false)
     }
   }
 
 
  return (
    <Dialog open={ismodelopen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-cennter">
            are you sure you want to leave <span className="font-bold text-red-800">{ server?.name}</span>
           </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={onClose} 
            
              disabled={loading}>
            
              Cancel
            </Button>
            <Button
            onClick={conirm }
            
              disabled={loading}>
              Confirm
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}