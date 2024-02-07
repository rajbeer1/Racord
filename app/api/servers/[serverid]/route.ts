import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req:Request,
  {params}:{params:{serverid:string}}
) {
  try {
    const {name,imageUrl} = await req.json()
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("unauthorized",{status:401})
    }
    const server = await db.server.update({
      where: {
        id: params.serverid,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log(error)
    return new NextResponse("internal error",{status:500})
  }
}