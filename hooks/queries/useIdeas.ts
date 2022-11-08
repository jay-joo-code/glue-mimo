import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseIdeasArgs {
  userId: number
  disabled?: boolean
  searchQuery?: string
}

export const queryConfigIdeas = ({
  userId,
  disabled,
  searchQuery,
}: IUseIdeasArgs): IGlueQueryConfig => ({
  url: "/glue/idea",
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
          updatedAt: "desc",
        },
      },
    },
  },
  disabled,
})

const useIdeas = ({
  userId,
  disabled = false,
  searchQuery = "",
}: IUseIdeasArgs) => {
  return useGlueQuery(
    queryConfigIdeas({
      userId,
      disabled,
      searchQuery,
    })
  )
}

export default useIdeas
