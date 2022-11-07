import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseIdeasArgs {
  userId: number
}

export const queryConfigIdeas = ({
  userId,
}: IUseIdeasArgs): IGlueQueryConfig => ({
  url: "/glue/idea",
  args: {
    where: {
      userId,
    },
  },
})

const useIdeas = ({ userId }: IUseIdeasArgs) => {
  return useGlueQuery(
    queryConfigIdeas({
      userId,
    })
  )
}

export default useIdeas
