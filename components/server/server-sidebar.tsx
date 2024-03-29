import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import { ServerHeader } from './serverheader'
import { ScrollArea } from '../ui/scroll-area'
import { ServerSearch } from './serversearch'
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import { Separator } from '../ui/separator'
const Serversidebar = async ({ serverid }: { serverid: string }) => {
  const profile = await currentProfile()
  const iconMap = {
    [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
    [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
   [ChannelType.VIDEO]:<Video className='mr-2 h-4 w-4 '/>   
  }
  const roleiconmap = {
    [MemberRole.GUEST]: null,
   [MemberRole.ADMIN]:<ShieldAlert  className='h-4 w-4 mr-2'/>,
    [MemberRole.MODERATOR]: <ShieldCheck className='h-4 w-4 mr-2' />
  }
  if (!profile) {
    return redirect('/')
  }
  const server = await db.server.findUnique({
    where: {
      id:serverid
    },
    include: {
      channels: {
        orderBy: {
          createdAt:"asc"
        }
      }, members: {
        include: {
          profile: true,
        }, orderBy: {
          role:'asc'
        }
      }
    }
  })
  const textchannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audiochannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videochannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
  const members = server?.members.filter((member) => member.profileId !== profile.id)
  if (!server) {
  return redirect("/")
  }
  const role = server.members.find((member)=>member.profileId===profile.id)?.role
  return (
    <div className='flex flex-col h-full text-primary w-full 
    dark:bg-[#2B2D31] bg-[#F2F3F5]'>
    
      <ServerHeader
        server={server}
        role={ role} />
   
    <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: "TEXT channel",
                type: 'channel',
                data: textchannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon:iconMap[channel.type]
                }))
              },{
                label: "AUDIO channel",
                type: 'channel',
                data: audiochannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon:iconMap[channel.type]
                }))
              },{
                label: "VIDEO channel",
                type: 'channel',
                data: videochannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon:iconMap[channel.type]
                }))
              },{
                label: "MEMBERS",
                type: 'member',
                data: members?.map((channel) => ({
                  id: channel.id,
                  name: channel.profile.name,
                  icon:roleiconmap[channel.role]
                }))
              }
              
          ]}
          />
        </div>
        <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2'/>
      </ScrollArea>
       </div> 
  )
}

export default Serversidebar