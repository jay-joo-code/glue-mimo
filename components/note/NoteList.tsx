import { Stack } from "@mantine/core"
import Button from "components/glue/Button"
import Container from "components/glue/Container"
import useNotes from "hooks/queries/useNotes"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import React, { useEffect } from "react"
import randomId from "util/glue/randomId"
import NoteItem from "./NoteItem"

interface INoteListProps {}

const NoteList = ({}: INoteListProps) => {
  const { data: notes, update: updateNotes } = useNotes({})

  const appendEmptyNote = async () => {
    const id = randomId()
    api.post("/glue/note", {
      id,
    })
    updateNotes("append-end", {
      id,
      content: "",
      spaceBy: "daily",
    })
  }

  useEffect(() => {
    if (
      notes &&
      (notes?.length === 0 ||
        notes[notes?.length - 1]?.content?.trim()?.length !== 0)
    ) {
      appendEmptyNote()
    }
  }, [notes])

  return (
    <Container>
      <Stack spacing={0}>
        {notes?.map((note) => (
          <NoteItem key={note?.id} note={note} />
        ))}
      </Stack>
    </Container>
  )
}

export default NoteList
