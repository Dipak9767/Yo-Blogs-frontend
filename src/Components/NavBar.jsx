import React from 'react'
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    useDisclosure,
    Stack,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from "../Redux/Actions";
import { ToastMessage } from '../Utils/ToastMessage';


const Links = [{
    name: "Home",
    url: "/"
},
{
    name: "My Blogs",
    url: "/my-blogs"
},
{
    name: "All Blogs",
    url: "/all-blogs"
},
{
    name: "Create Blogs",
    url: "/create-blog"
}];


const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user)
    const { toastMessage } = ToastMessage();
    
    const logOutHandler = () => {
        dispatch({ type: logOutUser })
        console.log('lougout')
        localStorage.setItem('bloguser',JSON.stringify( { isAuth: false, userInfo: {} }))
        toastMessage({status:200 , message:"Log Out Successful"})
    }
    return (
        <>
            <Box bg='#e1e2f7' px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={20} alignItems={'center'} justifyContent={'space-between'}  >
                        <Box color={'#7a6bb0'} fontSize={'30px'} fontWeight={'bold'}
                        >
                            <Link to={'/'}>Yo Blogs</Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={6}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link, idx) => (
                                <Link to={link.url} key={idx}>{link.name}</Link>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            {
                                user.isAuth ?
                                    <Button
                                        bg={'#7A6BB0'}
                                        borderRadius="8px"
                                        p={{base:'2',md:"4"}}
                                        lineHeight="0"
                                        size={{base:"sm",md:"md"}}
                                        color={'white'}
                                        className='btn'
                                        fontSize={{base:'10px',md:"15px"}}
                                        onClick={logOutHandler}
                                    >
                                        Log Out
                                    </Button>

                                    :
                                    <Link to={'/login'}>
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
                                            Log In
                                        </Button>
                                    </Link>
                            }
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link, idx) => (
                                <Link to={link.url} key={idx}>{link.name}</Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

export default NavBar