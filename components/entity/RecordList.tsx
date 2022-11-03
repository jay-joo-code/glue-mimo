import { Stack } from "@mantine/core"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"
import React, { useEffect } from "react"
import RecordItem from "./RecordItem"

interface IRecordListProps {
  sourceId: number
}

const RecordList = ({ sourceId }: IRecordListProps) => {
  const { data: records, refetch: refetchRecords } = useRecords({
    sourceId,
  })

  const createFirstRecord = async () => {
    await api.post("/glue/record", {
      sourceId,
    })
    refetchRecords()
  }

  useEffect(() => {
    if (records?.length === 0) {
      createFirstRecord()
    }
  }, [records])

  return (
    <Stack>
      {records?.map((record) => (
        <RecordItem key={record?.id} record={record} />
      ))}
    </Stack>
  )
}

export default RecordList
