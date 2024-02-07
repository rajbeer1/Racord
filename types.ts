import { Server, Member, Profile } from '@prisma/client'

export type serverwithMembersWithProfile = Server & {
  members:(Member & {profile: Profile})[]
}