import {
  Box,
  Stack,
  Skeleton,
  Text,
  Avatar,
  Badge,
  Container,
  HStack,
  Link,
} from "@chakra-ui/react";
import { DaoDetails, DaoSortBy, SortDirection, useFetchDaos } from "use-aragon";
import { ipfsUriToUrl } from "../lib/ipfsUriToUrl";

export default function DaoPage() {
  // All params are optional
  const daos = useFetchDaos({
    limit: 250,
    direction: SortDirection.DESC,
    skip: 0,
    sortBy: DaoSortBy.CREATED_AT,
  });

  return (
    <Stack spacing={{ base: "8", lg: "6" }}>
      {daos.isError && <div>error</div>}
      {daos.isLoading && <Skeleton height="container.sm" />}
      {daos.data?.map((dao) => (
        <DaoItem key={dao.address} {...dao} />
      ))}
    </Stack>
  );
}

const DaoItem = (props: DaoDetails) => {
  return (
    <Link
      href={`https://app.aragon.org/#/daos/ethereum/${props.address}/dashboard`}
      _hover={{ textDecoration: "none" }}
      _focus={{ outline: "none" }}
    >
      <Box as="section">
        <Container>
          <Box
            bg="bg-surface"
            px={{ base: "4", md: "6" }}
            py="5"
            boxShadow="sm"
            borderRadius="lg"
          >
            <Stack
              spacing="4"
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
            >
              <HStack spacing="4">
                <Avatar
                  src={ipfsUriToUrl(props.metadata.avatar)}
                  name={props.metadata.name}
                  boxSize={{ base: "12", sm: "14" }}
                />
                <Box>
                  <HStack>
                    <Text fontSize="lg" fontWeight="medium">
                      {props.metadata.name}
                    </Text>
                    {props.plugins.map((plugin) => (
                      <Badge
                        key={plugin.id}
                        variant="outline"
                        colorScheme="green"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="wide"
                        fontWeight="medium"
                        borderRadius="full"
                        px="2"
                      >
                        {plugin.id.split(".")[0]}
                      </Badge>
                    ))}
                  </HStack>
                  <Text color="muted" fontSize="sm">
                    {props.ensDomain}
                  </Text>
                </Box>
              </HStack>
              <HStack width={{ base: "50%" }} direction="row" spacing="3">
                <Text noOfLines={3}>{props.metadata.description}</Text>
              </HStack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Link>
  );
};
