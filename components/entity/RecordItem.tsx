import { Container } from "@mantine/core"
import { Source, Record } from "@prisma/client"
import Input from "components/glue/Input"
import React from "react"

interface IRecordItemProps {
  record: Record & {
    source: Source
  }
}

const RecordItem = ({ record }: IRecordItemProps) => {
  return (
    <Container>
      <Input value={record?.source?.name} />
    </Container>
  )
}

export default RecordItem
