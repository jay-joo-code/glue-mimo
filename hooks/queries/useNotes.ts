import { useMemo } from "react"
import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"
import { useSession } from "next-auth/react"
import { add, set } from "date-fns"
import { INoteListVariant } from "types"

export interface IUseNotesArgs {
  userId?: number
  today?: Date
  tomorrow?: Date
  variant: INoteListVariant
}

export const queryConfigNotes = ({
  userId,
  today,
  tomorrow,
  variant,
}: IUseNotesArgs): IGlueQueryConfig => {
  const variantToDate = {
    today: today,
    tomorrow: tomorrow,
  }

  return {
    url: "/glue/note",
    args: {
      where: {
        userId,
        availFrom: {
          gte: set(variantToDate[variant], {
            hours: 4,
          }),
          lte: variantToDate[variant],
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    },
  }
}

const useNotes = ({ variant }: IUseNotesArgs) => {
  const { data: session } = useSession()
  const today = useMemo(
    () =>
      set(new Date(), {
        hours: 5,
        minutes: 1,
        seconds: 0,
        milliseconds: 0,
      }),
    []
  )
  const tomorrow = useMemo(
    () =>
      set(
        add(new Date(), {
          days: 1,
        }),
        {
          hours: 5,
          minutes: 1,
          seconds: 0,
          milliseconds: 0,
        }
      ),
    []
  )

  return useGlueQuery(
    queryConfigNotes({
      userId: session?.user?.id,
      today,
      tomorrow,
      variant,
    })
  )
}

export default useNotes
