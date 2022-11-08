import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseSourcesArgs {
  userId: number
  disabled?: boolean
  searchQuery?: string
}

export const queryConfigSources = ({
  userId,
  disabled,
  searchQuery,
}: IUseSourcesArgs): IGlueQueryConfig => ({
  url: "/glue/source",
  args: {
    where: {
      userId,
      ...(searchQuery?.length > 0 && {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            records: {
              some: {
                content: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      }),
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

const useSources = ({
  userId,
  disabled = false,
  searchQuery = "",
}: IUseSourcesArgs) => {
  return useGlueQuery(
    queryConfigSources({
      userId,
      disabled,
      searchQuery,
    })
  )
}

export default useSources
