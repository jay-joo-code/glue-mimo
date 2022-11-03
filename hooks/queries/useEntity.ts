import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseEntityArgs {
  entityId: number
}

export const queryConfigEntity = ({
  entityId,
}: IUseEntityArgs): IGlueQueryConfig => ({
  url: `/glue/entity/${entityId}`,
  disabled: !Boolean(entityId),
})

const useEntity = ({ entityId }: IUseEntityArgs) => {
  return useGlueQuery(
    queryConfigEntity({
      entityId,
    })
  )
}

export default useEntity
