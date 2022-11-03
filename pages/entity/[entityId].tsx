import Input from "components/glue/Input"
import PageContainer from "components/glue/PageContainer"
import useEntity from "hooks/queries/useEntity"
import api from "lib/glue/api"
import { useRouter } from "next/router"

const EntityDetailsPage = () => {
  const router = useRouter()
  const { data: entity, update: updateEntity } = useEntity({
    entityId: Number(router?.query?.entityId),
  })

  const handleNameChange = (event) => {
    updateEntity("update", {
      name: event?.target?.value,
    })
  }

  const handleSaveName = (value) => {
    if (entity?.id) {
      api.put(`/glue/entity/${entity?.id}`, {
        name: value,
      })
    }
  }

  return (
    <PageContainer variant="responsive" title={`${entity?.name || "Untitled"}`}>
      <Input
        size="xl"
        variant="subtle"
        value={entity?.name}
        onChange={handleNameChange}
        placeholder="Untitled"
        onDebouncedChange={handleSaveName}
        sx={(theme) => ({
          input: {
            fontWeight: 600,
          },
        })}
      />
    </PageContainer>
  )
}

export default EntityDetailsPage
