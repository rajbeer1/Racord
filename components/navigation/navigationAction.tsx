"use client"
import { Plus } from "lucide-react"
import { usemodal } from "@/hooks/use-modal-store"
import { ActionTooltip } from "../action-tooltip"
const Navigationaction = () => {
  const { onOpen ,type} = usemodal()

  return (
    <div>
      <ActionTooltip label="add a server" side="right" align="center">
        <button
          onClick={()=>onOpen("createServer")}
          className="group flex items-center">
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px]
        group-hover:rounded-[1px] transition-all
        overflow-hidden items-center justify-center
        bg-background dark:bg-neutral-700 group-hover: bg-emerald-500
        ">
          <Plus className="group-hover:text-white transition
          text-emerald-500
       "
          size={25}
          />
        </div>
        </button>
        </ActionTooltip>
    </div>
  )
}

export default Navigationaction