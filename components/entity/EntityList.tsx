import { Container, Space, Stack } from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import Input from "components/glue/Input"
import useIdeas from "hooks/queries/useIdeas"
import useSources from "hooks/queries/useSources"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { IEntityVariant } from "types"
import EntityItem from "./EntityItem"

const EntityList = () => {
  const { data: session } = useSession()
  const [entityVariant, setEntityVariant] = useState<IEntityVariant>("source")
  const sourceButtonVariant = entityVariant === "source" ? "filled" : "light"
  const ideaButtonVariant = entityVariant === "idea" ? "filled" : "light"
  const router = useRouter()
  const { data: sources, refetch: refetchSources } = useSources({
    userId: session?.user?.id,
    disabled: entityVariant !== "source",
    searchQuery: router?.query["entity-search"] as string,
  })
  const { data: ideas } = useIdeas({
    userId: session?.user?.id,
    disabled: entityVariant !== "idea",
    searchQuery: router?.query["entity-search"] as string,
  })
  const searchInputRef = useRef(null)
  const handleFocusSearchInput = () => {
    searchInputRef?.current?.focus()
  }
  useHotkeys([["mod+k", handleFocusSearchInput]])

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
      <Input
        ref={searchInputRef}
        radius="xl"
        icon={<SearchIcon />}
        sourceOfTruth="url-query"
        glueKey="entity-search"
      />
      <Space mb="md" />
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
