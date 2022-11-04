import { Container, Space, Stack } from "@mantine/core"
import { Source, Record, Idea } from "@prisma/client"
import Input from "components/glue/Input"
import Textarea from "components/glue/Textarea"
import useRecord from "hooks/queries/useRecord"
import api from "lib/glue/api"
import React from "react"

interface IRecordItemProps {
  record: Record & {
    source: Source
    idea: Idea
  }
}

const RecordItem = ({ record }: IRecordItemProps) => {
  const { data: recordData, update: updateRecord } = useRecord({
    recordId: record?.id,
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

  return (
    <Container>
      <Input variant="subtle" value={record?.idea?.name} />
      <Space mb=".2rem" />
      <Textarea
        variant="subtle"
        value={recordData?.content}
        minRows={2}
        autosize={true}
        onChange={handleContentChange}
        onDebouncedChange={saveContent}
      />
    </Container>
  )
}

export default RecordItem
