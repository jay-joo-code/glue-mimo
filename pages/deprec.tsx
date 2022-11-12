import EntityList from "components/entity/EntityList"
import PageContainer from "components/glue/PageContainer"

const Index = () => {
  return (
    <PageContainer variant="responsive" title="Dashboard" isPrivate={true}>
      <EntityList />
    </PageContainer>
  )
}

export default Index
