
import { Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard'
import axios from 'axios'
import { BASE_URL } from '../Config'

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const user = JSON.parse(localStorage.getItem('bloguser'))
    const [loader, setLoader] = useState(true)
    const userId = user.userInfo._id

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${BASE_URL}blog/my-blogs?userId=${userId}`)
            setBlogs(res.data.data)
            setLoader(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <>
            <Heading textAlign={'center'}>My Blogs</Heading>
            <SimpleGrid
                display={'flex'}
                spacing={12}
                flexWrap={'wrap'}
                justifyContent={"center"}
                alignItems={'center'}
                templateColumns='repeat(auto-fill, minmax(400px, 1fr))'
                w={'98.5vw'}
                height={"80vh"}
                overflow={'auto'}
                py={8}
                px={2}
            >
                {

                    loader ?
                        <Spinner size="xl" color="blue.500" />
                        :
                        blogs.length > 0 ?
                            blogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))
                            :
                            <Text textAlign={'center'} mt={'10vh'} fontSize={'30px'}>No Blogs </Text>
                }
            </SimpleGrid>
        </>
    )
}

export default MyBlogs