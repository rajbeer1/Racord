"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usemodal } from "@/hooks/use-modal-store";
import axios from 'axios'
import {useParams, useRouter} from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/fileUpload";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "../ui/select";
import { ChannelType } from "@prisma/client";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required."
  }).refine(name => name !== "general", {
    message: "channel name can't be general"
  })
  ,
  type: z.nativeEnum(ChannelType)
});

export const Createchannelmodal = () => {
  const {isOpen,onClose,type} =usemodal()

  const router = useRouter()
  const ismodelopen = isOpen && type === "createchannel";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:ChannelType.TEXT
      
    }
  });
const params = useParams()
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
     try {
       await axios.post('/api/channel', {
         name: values.name,
         type: values.type,
         serverId: params?.serverid
       });
       form.reset()
       router.refresh()
       onClose()

     } catch (error) {
      console.log(error)
     }
  }

  const handleclose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={ismodelopen} onOpenChange={handleclose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Create Channel
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField control={form.control}
                name="type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select disabled={isLoading} defaultValue={field.value} onValueChange={field.onChange} >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0
                        focus:ring-offset-0 capitalize outline-none
                        ">
                       <SelectValue placeholder="select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem key={type}
                            value={type}
                            className="capitalize">{type.toLowerCase()}</SelectItem>
                      ))}
                      </SelectContent>
                      </Select>
                    
                </FormItem>
              )}/>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}