import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { ToastMessage } from '../Utils/ToastMessage';
import { BASE_URL } from '../Config';

const SingleBlog = () => {
  const { id } = useParams();


  const [blogData, setBlogData] = useState();
  const [isAuthor, setIsAuthor] = useState(false);
  const [date, setDate] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const [loader, setLoader] = useState(true)
  const { toastMessage } = ToastMessage()

  const fetchBlog = async () => {
    try {
      const blog = await axios.get(`${BASE_URL}blog/single-blog?blogID=${id}`);
      setBlogData(blog.data.data)
      setLoader(false)
      setDate(moment(blog.data.data.creationDateTime).format('DD-MMM-YYYY'));
      if (user.userInfo._id === blog.data.data.userId) {
        setIsAuthor(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async () => {
    try {
      const res = await axios.post(`${BASE_URL}blog/delete-blog`, { blogId: blogData._id });
      toastMessage(res.data);
      navigate('/my-blogs')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  return (

    <Flex
      w={'100vw'}
      height={'90vh'}
      direction={'column'}
      alignItems={'center'}
    >
      {
        blogData && !loader ?
          <Flex
            w={'100vw'}
            height={'90vh'}
            direction={'column'}
            alignItems={'center'}
            gap={'2rem'}
          >

            <Flex
              w={'100vw'}
              height={'auto'}
              direction={'column'}
              alignItems={'center'}
              justifyContent={'space-between'}

            >
              <Flex
                width={{ base: '90vw', md: '70vw' }}
                justifyContent={'space-between'}
                fontSize={{ base: '10px', sm: '15px', md: '20px' }}
                py={'10px'}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={'1rem '}

                >
                  <Text>{blogData.username}</Text>
                  <Text>{date}</Text>
                </Box>
                {
                  isAuthor ?
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      gap={'1rem '}
                    >
                      <Button
                        fontSize={{ base: '10px', sm: '12px', md: '15px' }}
                        p={{ base: '5px', sm: '15px', md: '20px' }}
                        onClick={() => {
                          navigate(`/edit-blog/${blogData._id}`)
                        }}
                      >Edit</Button>
                      <Button
                        bg={'crimson'}
                        color={'white'}
                        fontSize={{ base: '10px', sm: '12px', md: '15px' }}
                        p={{ base: '5px', sm: '15px', md: '20px' }}
                        onClick={deleteBlog}
                      >
                        Delete</Button>
                    </Box>
                    : ''
                }

              </Flex>

              <Heading
                fontWeight={'bold'}
                fontSize={{ base: '18px', sm: '25px', md: '40px' }}
                padding={'5px'}
                width={'90%'}
                textAlign={'center'}
              >
                {blogData.title}
              </Heading>
            </Flex>
            <Flex
              w={{ base: '95vw', sm: '90vw', md: '80vw' }}
              justifyContent={'center'}
              height={'65vh'}
              border={'2px solid RGB(122 107 176)'}
              padding={'20px'}
              borderRadius={'10px'}
              fontSize={{ base: '10px', sm: '15px', md: '20px' }}
              color={'RGB(139 144 231)'}
            >
              <Text>
                {blogData.textBody}
              </Text>
            </Flex>
          </Flex>
          :
          <Spinner mt={'10vh'} size="xl" color="blue.500" />
      }
    </Flex>


  )
}

export default SingleBlog