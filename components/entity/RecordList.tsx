import { Stack } from "@mantine/core"
import Textarea from "components/glue/Textarea"
import useKeyFocusRef from "hooks/glue/useKeyFocusRef"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"
import { useState } from "react"
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
  const { keyFocusInputRef, focusAtIdx } = useKeyFocusRef()

  const appendRecord = async (value) => {
    if (value?.length > 0) {
      await api.post("/glue/record", {
        sourceId,
        content: value,
      })
      setTempValue("")
      refetchRecords()
    }
  }

  const [tempValue, setTempValue] = useState<string>("")

  return (
    <Stack spacing="xs">
      {records?.map((record) => (
        <RecordItem
          key={record?.id}
          record={record}
          keyFocusInputRef={keyFocusInputRef}
        />
      ))}

      {/* textarea adder */}
      <Textarea
        ref={keyFocusInputRef}
        variant="subtle"
        size="md"
        minRows={1}
        value={tempValue}
        onChange={(event) => setTempValue(event?.target?.value)}
        onDebouncedChange={appendRecord}
      />
    </Stack>
  )
}

export default RecordList
