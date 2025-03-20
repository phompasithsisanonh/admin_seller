import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, HStack, VStack } from "@chakra-ui/react";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (

    <Box  w="full" display={'flex'}>
      <Sidebar 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar} 
        display={showSidebar ? "block" : "none"}
        />
      <Box flex="1" overflowY="auto"  w="full">
        <Header/>
        <Outlet />
      </Box>
    </Box>

  );
};

export default MainLayout;
