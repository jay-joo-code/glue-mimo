import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseSourcesArgs {
  userId: number
  disabled?: boolean
}

export const queryConfigSources = ({
  userId,
  disabled,
}: IUseSourcesArgs): IGlueQueryConfig => ({
  url: "/glue/source",
  args: {
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      records: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  },
  disabled,
})

const useSources = ({ userId, disabled = false }: IUseSourcesArgs) => {
  return useGlueQuery(
    queryConfigSources({
      userId,
      disabled,
    })
  )
}

export default useSources
