import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import {
  get_product,
  messageClear,
  product_image_update,
  update_product,
} from "../../store/Reducers/productReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  Select,
  Badge,
  Text,
  Image,
} from "@chakra-ui/react";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { product, loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(get_category({ searchValue: "", parPage: "", page: "" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId, dispatch]);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [imageShow, setImageShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({ oldImage: img, newImage: files[0], productId })
      );
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
    });
    setCategory(product.category);
    setImageShow(product.images);
  }, [product]);

  useEffect(() => {
    if (categorys.length > 0) {
      setAllCategory(categorys);
    }
  }, [categorys]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const update = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: productId,
    };
    dispatch(update_product(obj));
  };

  return (
    <Box px={{ base: 2, lg: 7 }} pt={5}>
      <Box p={4} rounded="md" bg="white" shadow="md">
        <Flex justify="space-between" align="center" pb={4}>
          <Text
            fontWeight={"bold"}
            fontSize={"20px"}
            as="h1"
            size="lg"
            color="black"
          >
            ແກ້ໄຂສິນຄ້າ ລະຫັດສິນຄ້າທີ່{" "}
            <Badge colorScheme="yellow">{productId.slice(-4)}</Badge>
          </Text>
          <Link
            to="/seller/dashboard/products"
            bg="blue.500"
            _hover={{ shadow: "lg" }}
            color="white"
            rounded="sm"
            px={7}
            py={2}
          >
            ສິນຄ້າທັງໝົດ
          </Link>
        </Flex>

        <form onSubmit={update}>
          <Flex direction={{ base: "column", md: "row" }} gap={4} mb={3}>
            <FormControl id="name">
              <FormLabel color="black">ຊື່ສິນຄ້າ</FormLabel>
              <Input
                value={state.name}
                onChange={inputHandle}
                placeholder="ຊື່ສິນຄ້າ"
                border="1px"
                borderColor="gray.300"
                color="black"
                name="name"
                isRequired
              />
            </FormControl>
            <FormControl id="brand">
              <FormLabel color="black">ແບຣນສິນຄ້າ</FormLabel>
              <Input
                value={state.brand}
                onChange={inputHandle}
                placeholder="ແບຣນສິນຄ້າ"
                border="1px"
                borderColor="gray.300"
                color="black"
                name="brand"
                isRequired
              />
            </FormControl>
          </Flex>

          <Flex direction={{ base: "column", md: "row" }} gap={4} mb={3}>
            <FormControl id="category">
              <FormLabel color="black">ໝວດສິິນຄ້າ</FormLabel>
              <Input
                value={category}
                onClick={() => setCateShow(!cateShow)}
                readOnly
                placeholder="--select category--"
                border="1px"
                borderColor="gray.300"
                color="black"
                name="category"
                isRequired
              />
              {cateShow && (
                <Box
                  width="full"
                  mt={1}
                  p={2}
                  borderRadius="md"
                  bg="white"
                  shadow="sm"
                >
                  <Input
                    value={searchValue}
                    onChange={categorySearch}
                    placeholder="Search"
                    bg="transparent"
                    border="1px"
                    borderColor="gray.300"
                    color="black"
                    mb={2}
                  />
                  <Select
                    placeholder="Select category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setCateShow(false);
                    }}
                    bg="white"
                    border="1px"
                    borderColor="gray.300"
                    color="black"
                  >
                    {allCategory.map((c, i) => (
                      <option key={i} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Select>
                </Box>
              )}
            </FormControl>

            <FormControl id="stock">
              <FormLabel color="black">ສະຕ໋ອກສິນຄ້າ</FormLabel>
              <Input
                value={state.stock}
                onChange={inputHandle}
                placeholder="ສະຕ໋ອກສິນຄ້າ"
                border="1px"
                borderColor="gray.300"
                color="black"
                name="stock"
                isRequired
              />
            </FormControl>
          </Flex>

          <Flex direction={{ base: "column", md: "row" }} gap={4} mb={3}>
            <FormControl id="price">
              <FormLabel color="black">ລາຄາຂາຍ</FormLabel>
              <Input
                value={state.price}
                onChange={inputHandle}
                type="number"
                placeholder="Price"
                border="1px"
                borderColor="gray.300"
                color="black"
                name="price"
                isRequired
              />
            </FormControl>
            <FormControl id="discount">
              <FormLabel color="black">ສ່ວນຫຼຸດ</FormLabel>
              <Input
                value={state.discount}
                onChange={inputHandle}
                type="number"
                placeholder="Discount by %"
                border="1px"
                borderColor="gray.300"
                color="black"
                name="discount"
              />
            </FormControl>
          </Flex>

          <FormControl id="description" mb={5}>
            <FormLabel color="black">ຄຳອະທິບາຍສິນຄ້າ</FormLabel>
            <Textarea
              value={state.description}
              onChange={inputHandle}
              placeholder="Description"
              border="1px"
              borderColor="gray.300"
              color="black"
              rows={4}
              name="description"
              isRequired
            />
          </FormControl>
          <HStack spacing={3} wrap="wrap" mb={4}>
            {imageShow &&
              imageShow.length > 0 &&
              imageShow.map((img, i) => (
                <Box key={i}>
                  <label htmlFor={i}>
                    <Image
                      src={img}
                      alt="Product"
                      width="100"
                      height="100"
                      style={{ borderRadius: "8px", margin: "5px" }}
                    />
                  </label>
                  <Input
                    onChange={(e) => changeImage(img, e.target.files)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                </Box>
              ))}
          </HStack>

          <Flex justify="flex-start" mt={4}>
            <Button
              type="submit"
              isLoading={loader}
              spinner={<PropagateLoader color="#fff" />}
              bg="red.500"
              color="white"
              width="full"
              _hover={{ bg: "red.600" }}
              rounded="md"
            >
              ບັນທຶກ
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default EditProduct;
