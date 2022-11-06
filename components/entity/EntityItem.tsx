import { Badge, Space, Text, useMantineTheme } from "@mantine/core"
import { Idea, Source } from "@prisma/client"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import IconButton from "components/glue/IconButton"
import Link from "next/link"
import React from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import api from "lib/glue/api"
import useSources from "hooks/queries/useSources"
import { useSession } from "next-auth/react"

interface ISourceItemProps {
  entity: Source | Idea
  variant: "source" | "idea"
}

const SourceItem = ({ entity, variant }: ISourceItemProps) => {
  const theme = useMantineTheme()
  const { data: session } = useSession()
  const { update: updateSources } = useSources({ userId: session?.user?.id })

  const handleDelete = () => {
    if (variant === "source") {
      api.delete(`/glue/source/${entity?.id}`)
      updateSources("delete-item", {
        id: entity?.id,
      })
    }
  }

  return (
    <Link href={`/${variant}/${entity?.id}`}>
      <Container
        isClickable={true}
        clickableHoverColor={theme?.colors?.gray[1]}
        glueKey={`${entity}-${entity?.id}`}
        p="xs"
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          background: theme.colors.gray[0],
        })}
      >
        <Text weight={500}>{entity?.name || `Untitled ${variant}`}</Text>
        <Space mb="xs" />
        <Flex justify="space-between">
          <Flex align="center">
            <Badge
              radius="xs"
              ml="-4px"
              size="sm"
              color={variant === "source" ? "indigo" : "green"}
            >
              {variant}
            </Badge>
          </Flex>
          <Flex align="center">
            <IconButton color="pink" size="xs" onClick={handleDelete}>
              <DeleteIcon
                sx={(theme) => ({
                  width: "16px",
                })}
              />
            </IconButton>
          </Flex>
        </Flex>
      </Container>
    </Link>
  )
}

export default SourceItem
