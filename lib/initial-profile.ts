import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "./db";

export const initialprofile = async() => {
  const user = await currentUser()
  if (!user) {
    redirectToSignIn()
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user?.id
    }
  })
  if (profile) return profile

  const newprofile = await db.profile.create({
    data: {
      userId: user?.id || '',
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl ||'',
      email: user?.emailAddresses[0].emailAddress || ''


    }
  })
  return newprofile
}