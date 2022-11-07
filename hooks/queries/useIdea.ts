import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseIdeaArgs {
  ideaId: number
  disabled?: boolean
}

export const queryConfigIdea = ({
  ideaId,
  disabled,
}: IUseIdeaArgs): IGlueQueryConfig => ({
  url: `/glue/idea/${ideaId}`,
  disabled: !Boolean(ideaId) || disabled,
})

const useIdea = ({ ideaId, disabled = false }: IUseIdeaArgs) => {
  return useGlueQuery(
    queryConfigIdea({
      ideaId,
      disabled,
    })
  )
}

export default useIdea
