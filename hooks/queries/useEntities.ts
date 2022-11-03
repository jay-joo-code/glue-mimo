import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseEntitiesArgs {
  userId: number
}

export const queryConfigEntities = ({
  userId,
}: IUseEntitiesArgs): IGlueQueryConfig => ({
  url: "/glue/entity",
  args: {
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  },
})

const useEntities = ({ userId }: IUseEntitiesArgs) => {
  return useGlueQuery(
    queryConfigEntities({
      userId,
    })
  )
}

export default useEntities
