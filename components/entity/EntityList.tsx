import { Container, Space, Stack } from "@mantine/core"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import useSources from "hooks/queries/useSources"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { IEntityVariant } from "types"
import EntityItem from "./EntityItem"
import AddIcon from "@mui/icons-material/Add"
import useIdeas from "hooks/queries/useIdeas"

const EntityList = () => {
  const { data: session } = useSession()
  const [entityVariant, setEntityVariant] = useState<IEntityVariant>("source")
  const sourceButtonVariant = entityVariant === "source" ? "filled" : "light"
  const ideaButtonVariant = entityVariant === "idea" ? "filled" : "light"
  const { data: sources, refetch: refetchSources } = useSources({
    userId: session?.user?.id,
    disabled: entityVariant !== "source",
  })
  const { data: ideas } = useIdeas({
    userId: session?.user?.id,
    disabled: entityVariant !== "idea",
  })
  const handleCreateSource = async () => {
    await api.post("/glue/source")
    refetchSources()
  }

  return (
    <Container
      sx={(theme) => ({
        width: "100%",
        flexShrink: 0,
        height: "80vh",
        overflow: "auto",

        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
          maxWidth: "300px",
        },
      })}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" justify="space-between" spacing="xs">
          <Button
            size="sm"
            compact={true}
            radius="lg"
            variant={sourceButtonVariant}
            onClick={() => setEntityVariant("source")}
          >
            Source
          </Button>
          <Button
            color="orange"
            size="sm"
            compact={true}
            radius="lg"
            variant={ideaButtonVariant}
            onClick={() => setEntityVariant("idea")}
          >
            Idea
          </Button>
        </Flex>
        <Button
          compact={true}
          onClick={handleCreateSource}
          leftIcon={<AddIcon />}
          sx={(theme) => ({
            "& .mantine-Button-leftIcon": {
              marginRight: ".2rem",
            },
          })}
        >
          New source
        </Button>
      </Flex>
      <Space mb="md" />
      <Stack spacing={0}>
        {sources?.map((source) => (
          <EntityItem key={source?.id} entity={source} variant="source" />
        ))}
        {ideas?.map((idea) => (
          <EntityItem key={idea?.id} entity={idea} variant="idea" />
        ))}
      </Stack>
    </Container>
  )
}

export default EntityList
