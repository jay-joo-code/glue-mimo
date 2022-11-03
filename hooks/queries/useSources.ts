import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseSourcesArgs {
  userId: number
}

export const queryConfigSources = ({
  userId,
}: IUseSourcesArgs): IGlueQueryConfig => ({
  url: "/glue/source",
  args: {
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  },
})

const useSources = ({ userId }: IUseSourcesArgs) => {
  return useGlueQuery(
    queryConfigSources({
      userId,
    })
  )
}

export default useSources
