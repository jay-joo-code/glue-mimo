import { Container, Space, Stack } from "@mantine/core"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import useSources from "hooks/queries/useSources"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import EntityItem from "./EntityItem"

const EntityList = () => {
  const { data: session } = useSession()
  const { data: sources, refetch: refetchSources } = useSources({
    userId: session?.user?.id,
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

        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
          maxWidth: "300px",
        },
      })}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" justify="space-between"></Flex>
        <Button compact={true} onClick={handleCreateSource}>
          New source
        </Button>
      </Flex>
      <Space mb="md" />
      <Stack spacing="xs">
        {sources?.map((source) => (
          <EntityItem key={source?.id} entity={source} variant="source" />
        ))}
      </Stack>
    </Container>
  )
}

export default EntityList
