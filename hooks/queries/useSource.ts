import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseSourceArgs {
  sourceId: number
  disabled?: boolean
}

export const queryConfigSource = ({
  sourceId,
  disabled,
}: IUseSourceArgs): IGlueQueryConfig => ({
  url: `/glue/source/${sourceId}`,
  disabled: !Boolean(sourceId) || disabled,
})

const useSource = ({ sourceId, disabled = false }: IUseSourceArgs) => {
  return useGlueQuery(
    queryConfigSource({
      sourceId,
      disabled,
    })
  )
}

export default useSource
