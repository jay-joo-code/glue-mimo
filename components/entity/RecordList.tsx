import { Space, Stack } from "@mantine/core"
import Container from "components/glue/Container"
import useKeyFocusRef from "hooks/glue/useKeyFocusRef"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"
import { useEffect } from "react"
import { IEntityVariant } from "types"
import RecordItem from "./RecordItem"

interface IRecordListProps {
  entityId: number
  entityVariant: IEntityVariant
}

const RecordList = ({ entityId, entityVariant }: IRecordListProps) => {
  const { data: records, refetch: refetchRecords } = useRecords({
    entityId,
    entityVariant,
  })
  const { keyFocusInputRef } = useKeyFocusRef()

  useEffect(() => {
    if (
      entityVariant === "source" &&
      records &&
      (records?.length === 0 ||
        records[records?.length - 1]?.content?.trim()?.length > 0)
    ) {
      appendRecord()
    }
  }, [records])

  const appendRecord = async () => {
    await api.post("/glue/record", {
      sourceId: entityId,
      content: "",
    })
    refetchRecords()
  }

  return (
    <Container>
      <Stack spacing="md">
        {records?.map((record) => (
          <RecordItem
            key={record?.id}
            recordInfo={record}
            keyFocusInputRef={keyFocusInputRef}
            entityId={entityId}
            entityVariant={entityVariant}
          />
        ))}
      </Stack>
      <Space mb="sm" />
    </Container>
  )
}

export default RecordList
