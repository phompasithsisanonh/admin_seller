import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import { add_product, messageClear } from "../../store/Reducers/productReducer";
import { PropagateLoader } from "react-spinners";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Textarea, Grid, IconButton } from "@chakra-ui/react";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  useEffect(() => {
    dispatch(get_category({ searchValue: "", parPage: "", page: "" }));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCategory(
      value ? categorys.filter((c) => c.name.toLowerCase().includes(value.toLowerCase())) : categorys
    );
  };

  const imageHandle = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImages((prevImages) => [...prevImages, ...fileArray]);
    setImageShow((prevImages) =>
      prevImages.concat(fileArray.map((file) => ({ url: URL.createObjectURL(file) })))
    );
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImageShow(imageShow.filter((_, i) => i !== index));
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price);
    formData.append("stock", state.stock);
    formData.append("discount", state.discount);
    formData.append("brand", state.brand);
    formData.append("shopName", "EasyShop");
    formData.append("category", category);

    images.forEach((img) => formData.append("images", img));

    dispatch(add_product(formData));
  };

  return (
    <Box  maxWidth="auto">
      <Box bg="white" borderRadius="md" shadow="md" p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Text fontSize="2xl" fontWeight="bold">ເພີ່ມສິນຄ້າ</Text>
          <Button colorScheme="teal" as="a" href="/seller/dashboard/products">
          ສິນຄ້າທັງໝົດ
          </Button>
        </Flex>
        <form onSubmit={add}>
          <Flex gap={4} mb={4}>
            <FormControl isRequired>
              <FormLabel>ຊື່ສິນຄ້າ</FormLabel>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={inputHandle}
                placeholder="ຊື່ສິນຄ້າ"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>ແບຣນສິນຄ້າ</FormLabel>
              <Input
                type="text"
                name="brand"
                value={state.brand}
                onChange={inputHandle}
                placeholder="ແບຣນສິນຄ້າ"
              />
            </FormControl>
          </Flex>

          <Flex gap={4} mb={4}>
            <FormControl isRequired>
              <FormLabel>ໝວດສິນຄ້າ</FormLabel>
              <Input
                readOnly
                value={category}
                onClick={() => setCateShow(!cateShow)}
                placeholder="ໝວດສິນຄ້າ"
              />
              {cateShow && (
                <Box mt={2} bg="gray.700" p={4} rounded="md">
                  <Input
                    value={searchValue}
                    onChange={categorySearch}
                    placeholder="Search category"
                  />
                  <Box mt={2}>
                    {categorys
                      .filter((cat) => cat.name.toLowerCase().includes(searchValue.toLowerCase()))
                      .map((c, i) => (
                        <Button
                          key={i}
                          onClick={() => {
                            setCategory(c.name);
                            setSearchValue("");
                            setCateShow(false);
                          }}
                          variant="outline"
                          colorScheme="teal"
                          w="full"
                          mt={2}
                        >
                          {c.name}
                        </Button>
                      ))}
                  </Box>
                </Box>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>ສະຕ໋ອກສິນຄ້າ</FormLabel>
              <Input
                type="number"
                name="stock"
                value={state.stock}
                onChange={inputHandle}
                placeholder="ສະຕ໋ອກສິນຄ້າ"
              />
            </FormControl>
          </Flex>

          <Flex gap={4} mb={4}>
            <FormControl isRequired>
              <FormLabel>ລາຄາຂາຍ</FormLabel>
              <Input
                type="number"
                name="price"
                value={state.price}
                onChange={inputHandle}
                placeholder="ລາຄາຂາຍ"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>ສ່ວນຫຼຸດ(%)</FormLabel>
              <Input
                type="number"
                name="discount"
                value={state.discount}
                onChange={inputHandle}
                placeholder="ສ່ວນຫຼຸດ"
              />
            </FormControl>
          </Flex>

          <FormControl isRequired>
            <FormLabel>ຄຳອະທິບາຍສິນຄ້າ</FormLabel>
            <Textarea
              name="description"
              value={state.description}
              onChange={inputHandle}
              placeholder="ຄຳອະທິບາຍສິນຄ້າ"
              rows={4}
            />
          </FormControl>

          <Box my={4}>
            <FormLabel>ເລືອກຮູບພາບ</FormLabel>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {imageShow.map((img, i) => (
                <Box key={i} position="relative">
                  <img src={img.url} alt="Product" width="100%" />
                  <IconButton
                    icon={<IoMdCloseCircle />}
                    position="absolute"
                    top="2"
                    right="2"
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeImage(i)}
                  />
                </Box>
              ))}
              <label htmlFor="image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', height: '150px', border: '2px dashed #e2e8f0' }}>
                <IoMdImages size={40} color="#e2e8f0" />
                <Text color="gray.500">Select Images</Text>
              </label>
              <input
                type="file"
                id="image"
                multiple
                onChange={imageHandle}
                style={{ display: 'none' }}
              />
            </Grid>
          </Box>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={loader}
            isDisabled={loader}
          >
            {loader ? <PropagateLoader color="#fff" size={10} /> : "ບັນທຶກສິນຄ້າ"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
