import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,{params}:{params:{serverid:string}}) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse("Unauthorized user", { status: 401 })
      
    }
    if (!params.serverid) {
      return new NextResponse('server not found')
    }
    const leave = await db.server.update({
      where: {
        id: params?.serverid,
        profileId: {
          not:profile.id
        }, members: {
          some: {
            profileId:profile.id
          }
        }
      }, data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })
    return NextResponse.json(leave)
  } catch (error) {
    return new NextResponse("internal server error",{status:500})
  }
}