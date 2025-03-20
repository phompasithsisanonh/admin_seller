import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import {
  banner_add,
  delete_banner,
  get_banner,
  get_product,
  messageClear,
} from "../../store/Reducers/productReducer";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";

const AddBanner = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loader, get_banners, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );
  const [imageShow, setImageShow] = useState([]);

  const [image, setImage] = useState([]);
  console.log(get_banners);

  const imageHandle = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImage((prevImages) => [...prevImages, ...fileArray]);
    setImageShow((prevImages) =>
      prevImages.concat(
        fileArray.map((file) => ({ url: URL.createObjectURL(file) }))
      )
    );
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    image.forEach((img) => formData.append("images", img));
    dispatch(banner_add(formData));
  };
  const removeImage = (index) => {
    console.log(index);
    dispatch(
      delete_banner({
        productId: productId,
        index: index,
      })
    ).then(() => dispatch(get_banner(productId)));
    setImageShow(imageShow.filter((_, i) => i !== index));
  };
  useEffect(() => {
    dispatch(get_product(productId));
    dispatch(get_banner(productId));
  }, [productId, dispatch]);
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
  return (
    <Box p={5}>
      <Text fontSize="lg" fontWeight="semibold" mb={3}>
        ເພີ່ມໂຄສະນາສິນຄ້າ
      </Text>
      <Box p={4} bg="gray.100" borderRadius="md">
        {!get_banners ? (
          <form onSubmit={add}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {imageShow?.map((img, i) => (
                  <Box key={i} position="relative">
                    <Image
                      borderRadius={"10px"}
                      src={img.url}
                      alt="Product"
                      width="100%"
                    />
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
                <label
                  htmlFor="image"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    height: "150px",
                    border: "2px dashed #e2e8f0",
                  }}
                >
                  <IoMdImages size={40} color="#e2e8f0" />
                  <Text color="gray.500">Select Images</Text>
                </label>
                <input
                  type="file"
                  id="image"
                  multiple
                  onChange={imageHandle}
                  style={{ display: "none" }}
                />
              </Grid>
              <Button
                type="submit"
                colorScheme="red"
                w="full"
                isLoading={loader}
              >
                {loader ? <Spinner size="sm" /> : "ບັນທືກ"}
              </Button>
            </VStack>
          </form>
        ) : (
          <form onSubmit={add}>
            <VStack spacing={4}>
              <Box my={4}>
                <FormLabel>ເລືອກຮູບພາບ</FormLabel>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                  {get_banners.banner?.map((img, i) => (
                    <Box key={i} position="relative">
                      <Image
                        borderRadius={"10px"}
                        src={img}
                        alt="Product"
                        width="100%"
                      />
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
                  {imageShow?.map((img, i) => (
                    <Box key={i} position="relative">
                      <Image
                        borderRadius={"10px"}
                        src={img.url}
                        alt="Product"
                        width="100%"
                      />
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
                  <label
                    htmlFor="image"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      height: "350px",
                      background: "yellow",
                      borderRadius: "10px",

                      border: "2px dashed #e2e8f0",
                    }}
                  >
                    <IoMdImages size={40} color="#e2e8f0" />
                    <Text color="gray.500">Select Images</Text>
                  </label>
                  <Input
                    type="file"
                    id="image"
                    multiple
                    onChange={imageHandle}
                    style={{ display: "none" }}
                  />
                </Grid>
              </Box>
              <Button
                type="submit"
                colorScheme="red"
                w="full"
                isLoading={loader}
              >
                {loader ? <Spinner size="sm" /> : "ອັບເດດ"}
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default AddBanner;
