import PageContainer from "components/glue/PageContainer"
import NoteList from "components/note/NoteList"
import React from "react"

const IndexPage = () => {
  return (
    <PageContainer variant="mobile-only" title="Dashboard" isPrivate={true}>
      <NoteList variant="today" />
      <NoteList variant="tomorrow" />
      {/* <NoteList variant="next-week" /> */}
    </PageContainer>
  )
}

export default IndexPage
