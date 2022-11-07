import { IEntityVariant } from "types"
import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseRecordsArgs {
  entityId: number
  entityVariant: IEntityVariant
}

export const queryConfigRecords = ({
  entityId,
  entityVariant,
}: IUseRecordsArgs): IGlueQueryConfig => ({
  url: "/glue/record",
  args: {
    where:
      entityVariant === "source"
        ? {
            sourceId: entityId,
          }
        : {
            ideaId: entityId,
          },
    include: {
      source: true,
      idea: true,
    },
    orderBy:
      entityVariant === "source"
        ? {
            createdAt: "asc",
          }
        : {
            updatedAt: "desc",
          },
  },
})

const useRecords = ({ entityId, entityVariant }: IUseRecordsArgs) => {
  return useGlueQuery(
    queryConfigRecords({
      entityId,
      entityVariant,
    })
  )
}

export default useRecords
