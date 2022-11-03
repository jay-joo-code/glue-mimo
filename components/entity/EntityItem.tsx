import { Badge, Space, Text, useMantineTheme } from "@mantine/core"
import { Entity } from "@prisma/client"
import Container from "components/glue/Container"
import Flex from "components/glue/Flex"
import Link from "next/link"
import React from "react"

interface IEntityItemProps {
  entity: Entity
}

const EntityItem = ({ entity }: IEntityItemProps) => {
  return (
    <Link href={`/entity/${entity?.id}`}>
      <Container
        isClickable={true}
        glueKey={`entity-${entity?.id}`}
        p="xs"
        sx={(theme) => ({
          borderRadius: theme.radius.md,
        })}
      >
        <Text weight={500}>
          {entity?.name || `Untitled ${entity?.variant}`}
        </Text>
        <Space mb="xs" />
        <Flex align="center">
          <Badge
            radius="xs"
            ml="-4px"
            size="sm"
            color={entity?.variant === "source" ? "indigo" : "green"}
          >
            {entity?.variant}
          </Badge>
        </Flex>
      </Container>
    </Link>
  )
}

export default EntityItem
