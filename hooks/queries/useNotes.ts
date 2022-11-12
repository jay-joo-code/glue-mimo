import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"
import { useSession } from "next-auth/react"

export interface IUseNotesArgs {
  userId?: number
}

export const queryConfigNotes = ({
  userId,
}: IUseNotesArgs): IGlueQueryConfig => ({
  url: "/glue/note",
  args: {
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  },
})

const useNotes = ({}: IUseNotesArgs) => {
  const { data: session } = useSession()

  return useGlueQuery(
    queryConfigNotes({
      userId: session?.user?.id,
    })
  )
}

export default useNotes
