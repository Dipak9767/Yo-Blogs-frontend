import React from "react";
import {
    Button,
    Flex,
    Image,
    Heading,
    Stack,
    
} from "@chakra-ui/react";
import { Link } from "react-router-dom";


const LandingPage = () => {
    
   
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            h={"90vh"}
            px={8}
        >
            <Stack
                spacing={4}
                w={{ base: "80%", md: "40%" }}
                align={["center", "center", "flex-start", "flex-start"]}
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="primary.800"
                    textAlign={["center", "center", "left", "left"]}
                >
                    {'Yo Blogs Share yours thougths'}
                </Heading>
                <Heading
                    as="h2"
                    size="md"
                    color="primary.800"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                >
                    {'Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.'}
                </Heading>
                <Link to={'/create-blog'}>
                    <Button
                       bg={'#7A6BB0'}
                        borderRadius="8px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        size="md"
                       color={'white'}
                       className='btn'
                    >
                        Create New Blog
                    </Button>
                </Link>
            </Stack>
            <Flex w={{ base: "90%", sm: "50%", md: "50%" , lg:"40%" }} height={'100%'} mb={{ base: 12, md: 0 }} alignItems={'center'} justifyContent={'center'}>
                {/* TODO: Make this change every X secs */}
                <Image src='https://png.pngtree.com/png-clipart/20200401/original/pngtree-web-development-web-analytics-web-design-concepts-vector-illustrations-for-web-png-image_5328288.jpg' w={{base:'80%',sm:'90%', md:'90%'}} mt="20px" size="100%" rounded="1rem" shadow="2xl" />
            </Flex>
        </Flex>
    );
}

export default LandingPage