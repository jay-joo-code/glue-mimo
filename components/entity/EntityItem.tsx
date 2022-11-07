import { Badge, Space, Text, useMantineTheme } from "@mantine/core"
import { Idea, Record, Source } from "@prisma/client"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import IconButton from "components/glue/IconButton"
import Link from "next/link"
import React from "react"
import dateFromNow from "util/glue/dateFromNow"
import DeleteIcon from "@mui/icons-material/Delete"
import api from "lib/glue/api"
import useSources from "hooks/queries/useSources"
import { useSession } from "next-auth/react"

interface ISourceItemProps {
  entity: (Source | Idea) & {
    records: Record[]
  }
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
    <Container
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.gray[1]}`,
      })}
    >
      <Link href={`/${variant}/${entity?.id}`}>
        <Container
          isClickable={true}
          glueKey={`${entity}-${entity?.id}`}
          px="xs"
          py="sm"
          sx={(theme) => ({
            borderRadius: theme.radius.md,
          })}
        >
          <Text
            weight={500}
            sx={(theme) => ({
              lineHeight: 1.5,
            })}
          >
            {entity?.name || `Untitled ${variant}`}
          </Text>
          <Space mb="xs" />
          <Flex justify="space-between" noWrap={true}>
            <Text size="xs" lineClamp={1} color="dimmed">
              {dateFromNow(new Date(entity?.updatedAt))}
              {entity?.records?.length > 0
                ? ` • ${entity?.records[0]?.content}`
                : ""}
            </Text>
            {/* <Flex align="center">
              <IconButton color="button-gray" size="xs" onClick={handleDelete}>
                <DeleteIcon
                  sx={(theme) => ({
                    width: "16px",
                  })}
                />
              </IconButton>
            </Flex> */}
          </Flex>
        </Container>
      </Link>
    </Container>
  )
}

export default SourceItem
