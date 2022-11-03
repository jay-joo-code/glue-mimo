import { Container, Space, Stack } from "@mantine/core"
import Button from "components/glue/Button"
import Flex from "components/glue/Flex"
import useEntities from "hooks/queries/useEntities"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import EntityItem from "./EntityItem"

const EntityList = () => {
  const { data: session } = useSession()
  const { data: entities, refetch: refetchEntities } = useEntities({
    userId: session?.user?.id,
  })

  const handleCreateSource = async () => {
    await api.post("/glue/entity", {
      variant: "source",
    })
    refetchEntities()
  }

  return (
    <Container
      sx={(theme) => ({
        maxWidth: "400px",
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
        {entities?.map((entity) => (
          <EntityItem key={entity?.id} entity={entity} />
        ))}
      </Stack>
    </Container>
  )
}

export default EntityList
