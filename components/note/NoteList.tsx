import { Stack } from "@mantine/core"
import Container from "components/glue/Container"
import Text from "components/glue/Text"
import { set } from "date-fns"
import useNotes from "hooks/queries/useNotes"
import api from "lib/glue/api"
import { useEffect } from "react"
import { INoteListVariant } from "types"
import randomId from "util/glue/randomId"
import NoteItem from "./NoteItem"

interface INoteListProps {
  variant: INoteListVariant
}

const NoteList = ({ variant }: INoteListProps) => {
  const { data: notes, update: updateNotes } = useNotes({
    variant,
  })

  const appendEmptyNote = async () => {
    const id = randomId()
    const defaultNote = {
      id,
      content: "",
      spaceBy: "daily",
      availFrom: set(new Date(), {
        hours: 5,
        minutes: 0,
        seconds: 0,
      }),
    }
    api.post("/glue/note", defaultNote)
    updateNotes("append-end", defaultNote)
  }

  useEffect(() => {
    if (
      variant === "today" &&
      notes &&
      (notes?.length === 0 ||
        notes[notes?.length - 1]?.content?.trim()?.length !== 0)
    ) {
      appendEmptyNote()
    }
  }, [notes])

  return (
    <Container>
      {variant === "tomorrow" && notes?.length > 0 && (
        <Text
          weight={600}
          mt="3rem"
          mb="lg"
          sx={(theme) => ({
            fontSize: "2.2rem",
          })}
        >
          Upcoming
        </Text>
      )}
      <Stack spacing={0}>
        {notes?.map((note, idx) => (
          <NoteItem
            key={note?.id}
            note={note}
            listVariant={variant}
            isLast={idx === notes?.length - 1}
          />
        ))}
      </Stack>
    </Container>
  )
}

export default NoteList
