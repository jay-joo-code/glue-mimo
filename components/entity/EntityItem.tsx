import { Badge, Space, Text, useMantineTheme } from "@mantine/core"
import { Idea, Source } from "@prisma/client"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import Link from "next/link"
import React from "react"

interface ISourceItemProps {
  entity: Source | Idea
  variant: "source" | "idea"
}

const SourceItem = ({ entity, variant }: ISourceItemProps) => {
  return (
    <Link href={`/${variant}/${entity?.id}`}>
      <Container
        isClickable={true}
        glueKey={`${entity}-${entity?.id}`}
        p="xs"
        sx={(theme) => ({
          borderRadius: theme.radius.md,
        })}
      >
        <Text weight={500}>{entity?.name || `Untitled ${variant}`}</Text>
        <Space mb="xs" />
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
      </Container>
    </Link>
  )
}

export default SourceItem
