import { Space, Stack } from "@mantine/core"
import Container from "components/glue/Container"
import Textarea from "components/glue/Textarea"
import useKeyFocusRef from "hooks/glue/useKeyFocusRef"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"
import { useState } from "react"
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

  const appendRecord = async (value) => {
    if (value?.length > 0) {
      const entityLinkData =
        entityVariant === "source"
          ? {
              sourceId: entityId,
            }
          : {
              ideaId: entityId,
            }
      await api.post("/glue/record", {
        ...entityLinkData,
        content: value,
      })
      setTempValue("")
      refetchRecords()
    }
  }

  const [tempValue, setTempValue] = useState<string>("")

  return (
    <Container>
      <Stack spacing={0}>
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
      {/* textarea adder */}
      {entityVariant === "source" && (
        <Textarea
          ref={keyFocusInputRef}
          variant="subtle"
          size="md"
          minRows={1}
          value={tempValue}
          onChange={(event) => setTempValue(event?.target?.value)}
          onDebouncedChange={appendRecord}
        />
      )}
    </Container>
  )
}

export default RecordList
