import { Container } from "@mantine/core"
import { Idea, Record, Source } from "@prisma/client"
import Textarea from "components/glue/Textarea"
import useFocusNext from "hooks/glue/useKeyFocusRef"
import useRecord from "hooks/queries/useRecord"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"

interface IRecordItemProps {
  record: Record & {
    source: Source
    idea: Idea
  }
  keyFocusInputRef: any
}

const RecordItem = ({ record, keyFocusInputRef }: IRecordItemProps) => {
  const { data: recordData, update: updateRecord } = useRecord({
    recordId: record?.id,
  })
  const { update: updateRecords } = useRecords({
    sourceId: record?.source?.id,
  })

  const handleContentChange = (event) => {
    updateRecord("update", {
      content: event?.target?.value,
    })
  }

  const saveContent = (value) => {
    if (record?.id) {
      api.put(`/glue/record/${record?.id}`, {
        content: value,
      })
    }
  }

  const handleKeyDown = (event) => {
    switch (event?.key) {
      case "Backspace":
        if (recordData?.content?.length === 0) {
          api.delete(`/glue/record/${record?.id}`)
          updateRecords("delete-item", {
            id: record?.id,
          })
        }
        break
    }
  }

  return (
    <Container>
      {/* <Input variant="subtle" value={record?.idea?.name} /> */}
      <Textarea
        ref={keyFocusInputRef}
        variant="subtle"
        size="md"
        value={recordData?.content}
        minRows={1}
        autosize={true}
        autoFocus={true}
        onChange={handleContentChange}
        onDebouncedChange={saveContent}
        onKeyDown={handleKeyDown}
      />
    </Container>
  )
}

export default RecordItem
