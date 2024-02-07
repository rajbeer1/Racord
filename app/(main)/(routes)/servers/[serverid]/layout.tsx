import Serversidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async  function Layout({
  params,
  children,
}: {
    children: React.ReactNode;
  params :{serverid :string}
  }) {
  
  const profile = await currentProfile()
  if (!profile) {
    return redirectToSignIn()
  }
  const server = db.server.findUnique({
    where: {
      id: params.serverid,
      members: {
        some: {
          profileId: profile.id
        }
      }
      
    }
  })
  if (!server) {
    return redirect('/')
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <Serversidebar serverid={ params.serverid} />
      </div>
      <main className="h-full md:pl-60"> {children}</main>
     

 </div>

  );
}  