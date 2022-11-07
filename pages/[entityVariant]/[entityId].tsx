import { Space } from "@mantine/core"
import EntityList from "components/entity/EntityList"
import RecordList from "components/entity/RecordList"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import Input from "components/glue/Input"
import PageContainer from "components/glue/PageContainer"
import Textarea from "components/glue/Textarea"
import useIdea from "hooks/queries/useIdea"
import useIdeas from "hooks/queries/useIdeas"
import useSource from "hooks/queries/useSource"
import useSources from "hooks/queries/useSources"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { IEntityVariant } from "types"

const SourceDetailsPage = () => {
  const router = useRouter()
  const entityVariant = router?.query?.entityVariant as IEntityVariant
  const entityId = Number(router?.query?.entityId)
  const { data: session } = useSession()

  // fetch source
  const { data: source, update: updateSource } = useSource({
    sourceId: entityId,
    disabled: entityVariant !== "source",
  })
  const { refetch: refetchSources } = useSources({
    userId: session?.user?.id,
    disabled: entityVariant !== "source",
  })

  // fetch idea
  const { data: idea, update: updateIdea } = useIdea({
    ideaId: entityId,
    disabled: entityVariant !== "idea",
  })
  const { refetch: refetchIdeas } = useIdeas({
    userId: session?.user?.id,
    disabled: entityVariant !== "idea",
  })

  const entityName = {
    source: source?.name,
    idea: idea?.name,
  }[entityVariant]

  const handleNameChange = (event) => {
    if (entityVariant === "source") {
      updateSource("update", {
        name: event?.target?.value,
      })
    } else if (entityVariant === "idea") {
      updateIdea("update", {
        name: event?.target?.value,
      })
    }
  }

  const handleSaveName = async (value) => {
    if (entityVariant === "source" && source?.id) {
      await api.put(`/glue/source/${source?.id}`, {
        name: value,
      })
      refetchSources()
    } else if (entityVariant === "idea" && idea?.id) {
      await api.put(`/glue/idea/${idea?.id}`, {
        name: value,
      })
      refetchIdeas()
    }
  }

  return (
    <PageContainer
      variant="responsive"
      title={entityName || "Untitled"}
      isPrivate={true}
    >
      <Flex align="flex-start">
        <EntityList />
        <Container
          mt="-1.2rem"
          sx={(theme) => ({
            flexGrow: 2,
          })}
        >
          <Textarea
            size="xl"
            variant="subtle"
            value={entityName}
            onChange={handleNameChange}
            placeholder="Untitled"
            onDebouncedChange={handleSaveName}
            autosize={true}
            minRows={1}
            sx={(theme) => ({
              textarea: {
                fontWeight: 600,
                width: "100%",
                fontSize: "2.2rem",
              },
            })}
          />
          <RecordList entityId={entityId} entityVariant={entityVariant} />
        </Container>
      </Flex>
    </PageContainer>
  )
}

export default SourceDetailsPage
