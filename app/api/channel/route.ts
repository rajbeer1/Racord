import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile()
    const {name,type,serverId} = await req.json();
    if (!profile) {
      return new NextResponse("Unauthorized",{status:401})
    }
    if (!serverId) {
      return new NextResponse("missing serverid")
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in:[MemberRole.ADMIN,MemberRole.ADMIN]
            }
          }
        }
      }, data: {
        channels: {
          create: {
            profileId: profile.id,
            name,type
           }
         }        
      }
    })
return NextResponse.json(server)
  } catch (error) {
    console.log(error)
    return new NextResponse("internal server error",{status:500})
  }
  
}