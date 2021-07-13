import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getProjects } from "../services/firebase";

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("projects", getProjects);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Projects() {
  // This useQuery could just as well happen in some deeper child to
  // the "Posts"-page, data will be available immediately either way
  const { data, isFetching } = useQuery("projects", getProjects);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {isFetching ? (
        <Spinner size="xl" />
      ) : (
        data?.map((doc) => (
          <Link href={`projects/${doc.id}`}>
            <Box w="100%" bg="blue.500" p="2">
              <Text fontSize="xl">{doc.title}</Text>
              <Text fontSize="sm">{doc.description}</Text>
              <Text fontSize="xs">{doc.start}</Text>
              <Text fontSize="xs">{doc.end}</Text>
            </Box>
          </Link>
        ))
      )}
    </Grid>
  );
}

export default Projects;
