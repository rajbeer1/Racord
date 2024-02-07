import { Server } from '@prisma/client';
import { create } from 'zustand'
export type modaltype = "createServer" | "invite" | "editserver" | "members" | "createchannel" | "leaveserver"
  |"deleteserver";
interface Modaldata {
  server? : Server
}
interface Modalstore{
  type: modaltype | null;
  isOpen: boolean;
  data: Modaldata;
  onOpen: (type: modaltype,data?:Modaldata) => void;
  onClose: ()=>void
}


export const usemodal = create<Modalstore>((set) => ({
  type: null,
  data:{},
  isOpen: false,
  onOpen(type,data={}) {
      set({isOpen:true,type,data})
  },
  onClose() {
      set({type:null ,isOpen:false})
  },
}))