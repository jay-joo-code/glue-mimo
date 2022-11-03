import prisma from "lib/glue/prisma"

// NOTE: don't combine crudEndpoints with appConfig
// because importing appConfig will always import prisma client
// and could slow down SSR

const crudEndpoints = {
  source: {
    model: prisma.source,
  },
  idea: {
    model: prisma.idea,
  },
  record: {
    model: prisma.record,
  },
}

export default crudEndpoints
