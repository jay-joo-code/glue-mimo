import EntityList from "components/entity/EntityList"
import PageContainer from "components/glue/PageContainer"

const Index = () => {
  return (
    <PageContainer variant="responsive" title="Dashboard">
      <EntityList />
    </PageContainer>
  )
}

export default Index
