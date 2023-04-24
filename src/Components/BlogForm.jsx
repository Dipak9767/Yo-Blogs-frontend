import { Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastMessage } from '../Utils/ToastMessage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Config'


const BlogForm = ({ isEdit, blogData }) => {


  const [blog, setBlog] = useState({
    title: "",
    textBody: ""
  })

  const navigate = useNavigate();
  const { toastMessage } = ToastMessage();
  const user = useSelector((state) => state.user)

  const submitHandler = async (e) => {
    e.preventDefault();
    const blogDetails = {
      ...blog,
      userId: user.userInfo._id,
      username: user.userInfo.username
    }
    try {
      let res;
      if (isEdit) {
         res = await axios.post(BASE_URL+'blog/edit-blog', blogDetails)
      } else {
         res = await axios.post(BASE_URL+'blog/create-blog', blogDetails)
      }
      toastMessage(res.data);
      
      if(res.data.status === 200){
        setBlog({
          title: "",
          textBody: ""
        })
        navigate('/all-blogs')
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    if (isEdit) {
      setBlog(blogData)
    } else {
      setBlog({
        title: "",
        textBody: ""
      })
    }
  }, [blogData, isEdit])
  return (
    <VStack h={'80vh'} border={'1px red'}>
      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} spacing={12}>
        <Heading
          mt={'15px'}
        >
          Create Blog</Heading>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type='text' w={'90vw'}
            border={'2px solid #7A6BB0 '}
            placeholder='Title' mb={'20px'}
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
          <FormLabel>TextBody</FormLabel>
          <Textarea
            placeholder='Write your blog here'
            w={'90vw'} border={'2px solid #7A6BB0 '}
            h={'50vh'}
            mb={'20px'}
            value={blog.textBody}
            onChange={(e) => setBlog({ ...blog, textBody: e.target.value })} />
        </FormControl>
        <Button
          bg={'#7A6BB0'}
          borderRadius="8px"
          py="4"
          px="16"
          lineHeight="1"
          size="md"
          color={'white'}
          onClick={submitHandler}
          className='btn'
        >
          {
            isEdit ? "Update Blog" : "Post Blog"
          }
        </Button>
      </Flex>
    </VStack>
  )
}

export default BlogForm