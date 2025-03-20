import React from "react";
import {  Input, Flex, Box } from "@chakra-ui/react";

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <Box p={4} borderRadius="md">
      <Flex justify="space-between" align="center">
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          focusBorderColor="indigo.500"
          _hover={{ borderColor: "indigo" }}
          placeholder="ຄົ້ນຫາຊື່ ຫຼື ເລກລະຫັດຜູ້ຂາຍ"
          w="auto"
        />
      </Flex>
    </Box>
  );
};

export default Search;
