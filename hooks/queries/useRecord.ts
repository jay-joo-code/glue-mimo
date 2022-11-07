import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseRecordArgs {
  recordId: number
}

export const queryConfigRecord = ({
  recordId,
}: IUseRecordArgs): IGlueQueryConfig => ({
  url: `/glue/record/${recordId}`,
  args: {
    include: {
      idea: true,
      source: true,
    },
  },
})

const useRecord = ({ recordId }: IUseRecordArgs) => {
  return useGlueQuery(
    queryConfigRecord({
      recordId,
    })
  )
}

export default useRecord
