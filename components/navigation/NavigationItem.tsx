"use client"
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";
interface NavigationItem {
  id: string;
  imageUrl: string;
  name: string
  
}
const NavigationItem = ({ id, imageUrl, name }: NavigationItem) => {
  const params = useParams()
  const router = useRouter()
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button className="group relative flex items-center" onClick={() => (
        router.push(`/servers/${id}`)
      )} >
        <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
          params?.serverid !== id && "group-hover:h-[20px]",
        params?.serverid ===id ?"h-[36px]":"h-[8px]"
        )} />
        <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[48px] group-hover:rounded-[16px] transition-all overflow-hidden",
        params?.serverid ===id && "bg-primary/10 text-primary rounded-[16px]"
        )}
        >
          <Image
            src={imageUrl}
            alt="channel"
            fill
          />
         </div>
       
        

      </button>


    </ActionTooltip>
  )
}

export default NavigationItem