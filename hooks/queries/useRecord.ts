import useGlueQuery, { IGlueQueryConfig } from "hooks/glue/useGlueQuery"

export interface IUseRecordArgs {
  recordId: number
}

export const queryConfigRecord = ({
  recordId,
}: IUseRecordArgs): IGlueQueryConfig => ({
  url: `/glue/record/${recordId}`,
  args: {},
})

const useRecord = ({ recordId }: IUseRecordArgs) => {
  return useGlueQuery(
    queryConfigRecord({
      recordId,
    })
  )
}

export default useRecord
