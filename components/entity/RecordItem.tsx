import { Badge, Select } from "@mantine/core"
import { Idea, Record, Source } from "@prisma/client"
import Button from "components/glue/Button"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import Text from "components/glue/Text"
import Textarea from "components/glue/Textarea"
import useIdeas from "hooks/queries/useIdeas"
import useRecord from "hooks/queries/useRecord"
import useRecords from "hooks/queries/useRecords"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { IEntityVariant } from "types"

interface IRecordItemProps {
  recordInfo: Record & {
    source: Source
    idea: Idea
  }
  keyFocusInputRef: any
  entityId: number
  entityVariant: IEntityVariant
}

const RecordItem = ({
  recordInfo,
  keyFocusInputRef,
  entityId,
  entityVariant,
}: IRecordItemProps) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const { data: session } = useSession()
  const { data: record, update: updateRecord } = useRecord({
    recordId: recordInfo?.id,
  })
  const { update: updateRecords } = useRecords({
    entityId,
    entityVariant,
  })

  // ideas
  const { data: ideas, update: updateIdeas } = useIdeas({
    userId: session?.user?.id,
  })
  const ideaOptions =
    ideas?.map((idea) => ({
      value: String(idea?.id),
      label: idea?.name,
    })) || []

  const handleContentChange = (event) => {
    updateRecord("update", {
      content: event?.target?.value,
    })
  }

  const saveContent = (value) => {
    if (recordInfo?.id) {
      api.put(`/glue/record/${recordInfo?.id}`, {
        content: value,
      })
    }
  }

  const handleKeyDown = (event) => {
    switch (event?.key) {
      case "Backspace":
        if (record?.content?.length === 0) {
          api.delete(`/glue/record/${recordInfo?.id}`)
          updateRecords("delete-item", {
            id: recordInfo?.id,
          })
        }
        break
    }
  }

  const createIdeaOption =
    searchValue?.length > 0
      ? [
          {
            value: "create-idea",
            label: `Create idea: ${searchValue}`,
          },
        ]
      : []

  const handleIdeaChange = async (newIdeaId) => {
    if (newIdeaId === "create-idea") {
      const { data } = await api.post("/glue/idea", {
        name: searchValue,
      })
      updateIdeas("append-end", data)
      updateRecord("update", {
        ideaId: data?.id,
        idea: data,
      })
      api.put(`/glue/record/${recordInfo?.id}`, {
        ideaId: data?.id,
      })
    } else {
      const targetIdea = ideas?.find((idea) => String(idea?.id) === newIdeaId)
      updateRecord("update", {
        ideaId: newIdeaId,
        idea: targetIdea,
      })
      api.put(`/glue/record/${recordInfo?.id}`, {
        ideaId: Number(newIdeaId),
      })
    }
  }

  const handleBlur = async () => {
    if (record?.idea) {
      // update existing idea name
      api.put(`/glue/idea/${record?.idea?.id}`, {
        name: searchValue,
      })
      updateIdeas("update-item", {
        id: record?.idea?.id,
        name: searchValue,
      })
    }
  }

  return (
    <Container>
      {entityVariant === "source" && (
        <Flex align="center" spacing={0}>
          <Link href={`/idea/${record?.ideaId}`}>
            <Container isClickable={true} mt=".6rem" p=".3rem">
              <Text size="sm" weight={700} color="gray">
                #
              </Text>
            </Container>
          </Link>

          <Select
            variant="unstyled"
            size="md"
            data={[...createIdeaOption, ...ideaOptions]}
            searchable={true}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            nothingFound="No options"
            value={String(record?.ideaId) || null}
            onChange={handleIdeaChange}
            sx={(theme) => ({
              flexGrow: 2,
              height: "34px",
              input: {
                color: theme.colors.brand,
                paddingLeft: ".2rem",
              },
            })}
            onBlur={handleBlur}
          />
        </Flex>
      )}
      {entityVariant === "idea" && (
        <Container mt="sm">
          <Link href={`/source/${record?.sourceId}`}>
            <Button radius="sm" variant="light" compact>
              {recordInfo?.source?.name}
            </Button>
          </Link>
        </Container>
      )}
      <Container
        sx={(theme) => ({
          position: "relative",
        })}
      >
        <Textarea
          ref={keyFocusInputRef}
          variant="subtle"
          size="md"
          value={record?.content}
          minRows={1}
          autosize={true}
          onChange={handleContentChange}
          onDebouncedChange={saveContent}
          onKeyDown={handleKeyDown}
          isDivOnBlur={true}
        />
      </Container>
    </Container>
  )
}

export default RecordItem
