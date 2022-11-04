import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseRecordsArgs {
  sourceId: number
}

export const queryConfigRecords = ({
  sourceId,
}: IUseRecordsArgs): IGlueQueryConfig => ({
  url: "/glue/record",
  args: {
    where: {
      sourceId,
    },
    include: {
      source: true,
      idea: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  },
})

const useRecords = ({ sourceId }: IUseRecordsArgs) => {
  return useGlueQuery(
    queryConfigRecords({
      sourceId,
    })
  )
}

export default useRecords
