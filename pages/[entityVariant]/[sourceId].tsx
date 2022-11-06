import { Space } from "@mantine/core"
import EntityList from "components/entity/EntityList"
import RecordList from "components/entity/RecordList"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import Input from "components/glue/Input"
import PageContainer from "components/glue/PageContainer"
import Textarea from "components/glue/Textarea"
import useSource from "hooks/queries/useSource"
import useSources from "hooks/queries/useSources"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { IEntityVariant } from "types"

const SourceDetailsPage = () => {
  const router = useRouter()
  const { data: source, update: updateSource } = useSource({
    sourceId: Number(router?.query?.sourceId),
  })
  const { data: session } = useSession()
  const { refetch: refetchSources } = useSources({
    userId: session?.user?.id,
  })
  const entityVariant = router?.query?.entityVariant

  const handleNameChange = (event) => {
    updateSource("update", {
      name: event?.target?.value,
    })
  }

  const handleSaveName = async (value) => {
    if (source?.id) {
      if (entityVariant === "source") {
        await api.put(`/glue/source/${source?.id}`, {
          name: value,
        })
        refetchSources()
      } else if (entityVariant === "idea") {
        // TODO:
      }
    }
  }

  return (
    <PageContainer variant="responsive" title={`${source?.name || "Untitled"}`}>
      <Flex align="flex-start">
        <EntityList />
        <Container
          sx={(theme) => ({
            flexGrow: 2,
          })}
        >
          <Textarea
            size="xl"
            variant="subtle"
            value={source?.name}
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
          <Space mb="sm" />
          <RecordList
            sourceId={source?.id}
            displayVariant={entityVariant as IEntityVariant}
          />
        </Container>
      </Flex>
    </PageContainer>
  )
}

export default SourceDetailsPage
