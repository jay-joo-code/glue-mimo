import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseIdeasArgs {
  userId: number
  disabled?: boolean
}

export const queryConfigIdeas = ({
  userId,
  disabled,
}: IUseIdeasArgs): IGlueQueryConfig => ({
  url: "/glue/idea",
  args: {
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      records: true,
    },
  },
  disabled,
})

const useIdeas = ({ userId, disabled = false }: IUseIdeasArgs) => {
  return useGlueQuery(
    queryConfigIdeas({
      userId,
      disabled,
    })
  )
}

export default useIdeas
