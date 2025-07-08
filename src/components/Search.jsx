import React from "react";
import { Select, Input, Flex, Box } from "@chakra-ui/react";

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <Box p={4} borderRadius="md">
      <Flex justify="space-between" align="center">
        <Select
          onChange={(e) => setParPage(parseInt(e.target.value))}
          value={5}
          focusBorderColor="indigo.500"
          _hover={{ borderColor: "indigo.500" }}
          w="auto"
        >
          <option value="5">9</option>
          <option value="10">10</option>

        </Select>

        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          focusBorderColor="indigo.500"
          _hover={{ borderColor: "indigo.500" }}
          placeholder="Search"
          w="auto"
        />
      </Flex>
    </Box>
  );
};

export default Search;
