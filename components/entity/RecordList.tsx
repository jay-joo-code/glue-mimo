import { Stack } from "@mantine/core"
import Button from "components/glue/Button"
import Container from "components/glue/Container"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"
import React, { useEffect } from "react"
import { IEntityVariant } from "types"
import RecordItem from "./RecordItem"

interface IRecordListProps {
  displayVariant: IEntityVariant
  sourceId?: number
  ideaId?: number
}

const RecordList = ({ sourceId, ideaId, displayVariant }: IRecordListProps) => {
  const { data: records, refetch: refetchRecords } = useRecords({
    sourceId,
  })

  const createRecord = async () => {
    await api.post("/glue/record", {
      sourceId,
    })
    refetchRecords()
  }

  useEffect(() => {
    if (records?.length === 0) {
      createRecord()
    }
  }, [records])

  return (
    <Stack>
      {records?.map((record) => (
        <RecordItem key={record?.id} record={record} />
      ))}
      <Container>
        <Button onClick={createRecord}>Add record</Button>
      </Container>
    </Stack>
  )
}

export default RecordList
