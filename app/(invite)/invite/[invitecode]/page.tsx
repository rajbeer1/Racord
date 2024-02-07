import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface invitecodeprops{
  params: {
    invitecode: string
  }
}
const Invitecodepage = async ({ params }: invitecodeprops) => {
  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }
  if (!params.invitecode) return redirect('/')
  const existingserver = await db.server.findFirst({
    where: {
      inviteCode: params.invitecode,
      members: {
        some: {
          profileId:profile.id
        }
      }
    }
  })
  if (existingserver) {
    return redirect(`/servers/${existingserver.id}`);

  }
  const server = await db.server.update({
    where: {
      inviteCode: params.invitecode
    }, data: {
      members: {
        create: [{
          profileId:profile.id
        }]
      }
    }
  })
  if(server) return redirect(`/servers/${server.id}`)
   return (
    <div>Invitecodepage</div>
  )
}

export default Invitecodepage