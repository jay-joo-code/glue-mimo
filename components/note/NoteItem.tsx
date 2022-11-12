import { useFocusWithin } from "@mantine/hooks"
import { Note } from "@prisma/client"
import Button from "components/glue/Button"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import IconButton from "components/glue/IconButton"
import Input from "components/glue/Input"
import Textarea from "components/glue/Textarea"
import useNotes from "hooks/queries/useNotes"
import api from "lib/glue/api"
import React from "react"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { showNotification } from "@mantine/notifications"
import spaceByToAvailFrom from "util/spaceByToAvailFrom"
import { INoteListVariant } from "types"

interface INoteItemProps {
  note: Note
  listVariant: INoteListVariant
  isLast?: boolean
}

const NoteItem = ({ note, listVariant, isLast = false }: INoteItemProps) => {
  const { update: updateNotes } = useNotes({
    variant: listVariant,
  })
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

  const nextSpaceBy = {
    daily: "weekly",
    weekly: "monthly",
    monthly: "archived",
    archived: "daily",
  }

  const handleToggleSpaceBy = async () => {
    updateNotes("update-item", {
      id: note?.id,
      spaceBy: nextSpaceBy[note?.spaceBy],
    })
    api.put(`/glue/note/${note?.id}`, {
      spaceBy: nextSpaceBy[note?.spaceBy],
    })
  }

  const deleteNote = () => {
    updateNotes("delete-item", {
      id: note?.id,
    })
    api.delete(`/glue/note/${note?.id}`)
  }

  const handleKeyDown = (event) => {
    switch (event?.key) {
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

  const markComplete = () => {
    api.put(`/glue/note/${note?.id}`, {
      availFrom: spaceByToAvailFrom[note?.spaceBy],
    })
    showNotification({
      color: "green",
      message: "Marked complete!",
    })
  }

  return (
    <Container ref={ref} mb="lg">
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
        autoFocus={listVariant === "today" && isLast}
      />
      <Flex
        align="center"
        justify="space-between"
        sx={(theme) => ({
          opacity: focused ? 1 : 0.4,
          transition: "opacity 200ms ease-in-out",
        })}
      >
        <Flex align="center" spacing="xs">
          <Button
            compact={true}
            color="gray"
            size="xs"
            onClick={handleToggleSpaceBy}
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
        <IconButton color="brand" size="sm" onClick={markComplete}>
          <CheckCircleIcon
            sx={(theme) => ({
              width: "16px",
            })}
          />
        </IconButton>
      </Flex>
    </Container>
  )
}

export default NoteItem
