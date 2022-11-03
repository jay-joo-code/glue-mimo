import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseSourceArgs {
  sourceId: number
}

export const queryConfigSource = ({
  sourceId,
}: IUseSourceArgs): IGlueQueryConfig => ({
  url: `/glue/source/${sourceId}`,
  disabled: !Boolean(sourceId),
})

const useSource = ({ sourceId }: IUseSourceArgs) => {
  return useGlueQuery(
    queryConfigSource({
      sourceId,
    })
  )
}

export default useSource
