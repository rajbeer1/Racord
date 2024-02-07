"use client"

import { useEffect, useState } from "react"
import { Createservermodal } from "../modals/create-server-modal"
import { InviteModal } from "../modals/invite-modal"
import { Editservermodal } from "../modals/edit-server-modal"
import { MemberModal } from "../modals/members-modal"
import { Createchannelmodal } from "../modals/create-channel-modal"
import { LeaveserverModal } from "../modals/leave-server-modal"
import { DeleteserverModal } from "../modals/delete-server"

export const Modalprovider = () => {
  const [ismounted, setismounted] = useState(false)
  useEffect(() => (setismounted(true)), [])
  if (!ismounted) {
    return null
  }
  return (<>
    <Createservermodal />
    <InviteModal />
    <Editservermodal />
    <MemberModal />
    <Createchannelmodal />
    <LeaveserverModal />
    <DeleteserverModal/>
  </>)
}