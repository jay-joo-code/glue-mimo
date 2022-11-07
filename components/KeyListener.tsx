import { useHotkeys, useSetState } from "@mantine/hooks"
import useSources from "hooks/queries/useSources"
import api from "lib/glue/api"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"

const KeyListener = () => {
  const { data: session } = useSession()
  const { update: updateSources } = useSources({
    userId: session?.user?.id,
  })
  const router = useRouter()
  const handleCreateSource = async () => {
    const { data } = await api.post("/glue/source")
    updateSources("append-start", data)
    router.push(`/source/${data?.id}`)
  }

  useHotkeys([["mod+n", handleCreateSource]])
  return null
}

export default KeyListener
