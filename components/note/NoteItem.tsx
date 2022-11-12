import { useFocusWithin } from "@mantine/hooks"
import { Note } from "@prisma/client"
import Button from "components/glue/Button"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import Input from "components/glue/Input"
import Textarea from "components/glue/Textarea"
import useNotes from "hooks/queries/useNotes"
import api from "lib/glue/api"
import React from "react"

interface INoteItemProps {
  note: Note
}

const NoteItem = ({ note }: INoteItemProps) => {
  const { update: updateNotes } = useNotes({})
  const { ref, focused } = useFocusWithin()

  const handleContentChange = (event) => {
    updateNotes("update-item", {
      id: note?.id,
      content: event?.target?.value,
    })
  }

  const handleDebouncedContentChange = (value: string) => {
    api.put(`/glue/note/${note?.id}`, {
      content: value,
    })
  }

  const handleToggleSpaceBy = async () => {
    console.log("toggle")
  }

  const deleteNote = () => {
    updateNotes("delete-item", {
      id: note?.id,
    })
    api.delete(`/glue/note/${note?.id}`)
  }

  const handleKeyDown = (event) => {
    switch (event?.key) {
      case "Enter": {
        handleToggleSpaceBy()
        break
      }
      case "Backspace": {
        if (note?.content?.trim()?.length === 0) {
          deleteNote()
        }
        break
      }
    }
  }

  const handleSourceChange = (event) => {
    updateNotes("update-item", {
      id: note?.id,
      source: event?.target?.value,
    })
  }

  const handleDebouncedSourceChange = (value: string) => {
    api.put(`/glue/note/${note?.id}`, {
      source: value,
    })
  }

  return (
    <Container ref={ref}>
      <Textarea
        variant="unstyled"
        size="md"
        placeholder="Start writing my thoughts ..."
        value={note?.content}
        minRows={1}
        autosize={true}
        onChange={handleContentChange}
        onDebouncedChange={handleDebouncedContentChange}
        onKeyDown={handleKeyDown}
      />
      <Flex
        align="center"
        spacing="xs"
        sx={(theme) => ({
          opacity: focused ? 1 : 0,
          transition: "opacity 200ms ease-in-out",
        })}
      >
        <Button
          compact={true}
          color="gray"
          size="xs"
          onClick={handleToggleSpaceBy}
          onKeyDown={handleKeyDown}
        >
          {note?.spaceBy}
        </Button>
        <Input
          placeholder="Source"
          variant="unstyled"
          value={note?.source}
          onChange={handleSourceChange}
          onDebouncedChange={handleDebouncedSourceChange}
          sx={(theme) => ({
            flexGrow: 2,
            padding: 0,
          })}
        />
      </Flex>
    </Container>
  )
}

export default NoteItem
