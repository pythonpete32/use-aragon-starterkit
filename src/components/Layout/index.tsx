import { Box, Container, StatDownArrow } from "@chakra-ui/react";

import { Navbar } from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box as="section" height="100vh" overflowY="auto">
      <Navbar />
      <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
