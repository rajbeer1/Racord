import { initialprofile } from "@/lib/initial-profile"
import { db } from "@/lib/db"
import { InitialModal } from "@/components/modals/initial-modal"
import { redirect } from "next/navigation"
const Setuppage = async() => {
  const profile = await initialprofile()
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })
  if(server) return redirect(`/servers/${server.id}`)
  return (
    <InitialModal/>
  )
}


export default Setuppage