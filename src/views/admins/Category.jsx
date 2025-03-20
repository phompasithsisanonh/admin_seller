import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  categoryAdd,
  messageClear,
  get_category,
  updatecategoryAdd,
} from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  IconButton,

} from "@chakra-ui/react";

const Category = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loader,
    parPage,
    successMessage,
    errorMessage,
    categorys,
  } = useSelector((state) => state.category);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [show, setShow] = useState(false); // Add category toggle
  const [imageShow, setImageShow] = useState("");
  const [isEdit, setIsEdit] = useState(false); // Edit category toggle

  const [data, setData] = useState({});
  const [imageShow1, setImageShow1] = useState();

  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };
  const addOrUpdateCategory = (e) => {
    e.preventDefault();
    if (isEdit) {
      toast.success("Category updated successfully!");
    } else {
      dispatch(categoryAdd(state));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({ name: "", image: "" });
      setImageShow("");
      setIsEdit(false);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch,setSearchValue]);
  const changeImage = (img, files, id) => {
    if (files.length > 0) {
      dispatch(
        updatecategoryAdd({
          oldImage: img,
          newImage: files[0],
          categorysId: id,
        })
      ).then(() => dispatch(get_category()));
    }
  };
  useEffect(() => {
    dispatch(get_category());
  }, [searchValue, parPage, dispatch]);

  const handleEdit = (category) => {
    setData(category);
    setIsEdit(true);
    setImageShow1(category.image);
    setIsReceiptModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this category?")) {
      // Uncomment when delete action is implemented
      // dispatch(deleteCategory(id));
      toast.success("Category deleted successfully!");
    }
  };
  // Calculate total pages for the sellers
  let itemsPerPage = 3;
  const totalSellers = categorys.length;
  const totalPages = Math.ceil(totalSellers / itemsPerPage); ///2

  // Handle page change
  const changePage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Boundary check  2<1 ||  2>2
    setCurrentPage(pageNumber);
  };

  // Get current sellers to display
  const indexOfLastSeller = currentPage * itemsPerPage; //1 *2 =2
  const indexOfFirstSeller = indexOfLastSeller - itemsPerPage; ///2-2 =0
  const filteredSellers = categorys.filter((seller) => {
    const filteredProducts = seller.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return filteredProducts || filteredProducts.length > 0;
  });
  const currentSellers = filteredSellers.slice(
    indexOfFirstSeller, //0
    indexOfLastSeller //2
  );
  return (
    <Box
      w="full"
      bg="white"
      p="6"
      boxShadow="md"
      borderRadius="lg"
      px="4"
      py="5"
    >
      <Box display="flex" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="20px">
          ໝວດສິນຄ້າ
        </Text>
        <Button onClick={() => setShow((prev) => !prev)} colorScheme="red">
          {show ? "ປິດ" : "ເພີ່ມໝວດສິນຄ້າ"}
        </Button>
      </Box>

      <Box display="flex" flexDirection="row">
        <Box w="full">
          <Box rounded="md">
            <Box overflow="auto" position="relative">
              <Table w="full" textAlign="left">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentSellers.map((d, i) => (
                    <tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>
                        <Image
                          w="45px"
                          height="45px"
                          src={d.image}
                          alt=""
                          objectFit="cover"
                        />
                      </Td>
                      <Td>{d.name}</Td>
                      <Td>
                        <Box display="flex" justifyContent="start" gap={4}>
                          <IconButton
                            icon={<FaEdit />}
                            onClick={() => handleEdit(d)}
                          />
                          <Link
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                            onClick={() => handleDelete(d._id)}
                          >
                            <FaTrash />
                          </Link>
                        </Box>
                      </Td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Box
              display={"flex"}
              paddingTop={"30px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>

        {show && (
          <Box
            w={{ base: "320px", lg: "5/12" }}
            position={{ base: "fixed", lg: "relative" }}
            right={show ? "0" : "-340px"}
            zIndex="9999"
            top="0"
            transition="all 0.5s"
            h="auto"
            p={3}
            borderRadius="md"
            bg="white"
            boxShadow="md"
            color="#d0d2d6"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Text
                fontSize="xl"
                fontWeight="semibold"
                textAlign="center"
                w="full"
              >
                Add Category
              </Text>
              <Box
                display={{ base: "block", lg: "none" }}
                onClick={() => setShow(false)}
              >
                <IoMdCloseCircle />
              </Box>
            </Box>

            <form onSubmit={addOrUpdateCategory}>
              <FormControl mb={3}>
                <FormLabel htmlFor="name">Category Name</FormLabel>
                <Input
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  bg="white"
                  borderColor="gray.700"
                  focusBorderColor="indigo.500"
                  textColor="black"
                  placeholder="Category Name"
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="image"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  h="238px"
                  cursor="pointer"
                  border="dashed"
                  borderColor="#d0d2d6"
                  _hover={{ borderColor: "red.500" }}
                >
                  {imageShow ? (
                    <Image w="full" h="full" src={imageShow} />
                  ) : (
                    <>
                      <FaImage />
                      <Text>Select Image</Text>
                    </>
                  )}
                </FormLabel>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  display="none"
                  onChange={imageHandle}
                />
              </FormControl>

              <Button
                isDisabled={loader}
                bg="red.500"
                w="full"
                mt={4}
                color="white"
                _hover={{ shadow: "lg", shadowColor: "red.300/50" }}
                type="submit"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Add Category"
                )}
              </Button>
            </form>
          </Box>
        )}

        <Modal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>ແກ້ໄຂ category</ModalHeader>
            {loader ? (
              <PropagateLoader color="#fff" cssOverride={overrideStyle} />
            ) : (
              <FormControl>
                <FormLabel
                  htmlFor="image"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  h="238px"
                  cursor="pointer"
                  border="dashed"
                  borderColor="#d0d2d6"
                  _hover={{ borderColor: "red.500" }}
                >
                  {imageShow1 ? (
                    <Image
                      w="full"
                      h="full"
                      objectFit={"cover"}
                      src={imageShow1}
                    />
                  ) : (
                    <>
                      <FaImage />
                      <Text>Select Image</Text>
                    </>
                  )}
                </FormLabel>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  display="none"
                  onChange={(e) =>
                    changeImage(imageShow1, e.target.files, data._id)
                  }
                />
              </FormControl>
            )}

            <ModalCloseButton />
            <ModalBody />
            <ModalFooter>
              <Button onClick={() => setIsReceiptModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default Category;
