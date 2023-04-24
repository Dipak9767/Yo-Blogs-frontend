import React from 'react'
import {  Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react'
import moment from 'moment/moment';
import {  useNavigate } from 'react-router-dom';



const BlogCard = ({ blog}) => {

    const date = moment(blog.creationDateTime).format('DD-MMM-YYYY');
    const navigate = useNavigate()

    return (
        <Card border={'2px solid #7A6BB0'} w='450px' h='350px' >
            <CardHeader textAlign={'center'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Heading size='md' noOfLines={1} flex={'3'}> {blog.title}</Heading>
               
            </CardHeader>
            <CardBody >
                <Text noOfLines={{ base: 3, sm: 4 }} fontSize={{ base: '15px', sm: '20px' }}>{blog.textBody}</Text>
            </CardBody>
            <CardFooter display={'flex'} gap={{ base: "5px" }} flexDirection={{ base: 'column', sm: 'row' }} justifyContent={'space-around'} alignItems={'center'}>
                <Text fontSize={{ base: '12px', sm: '17px' }} color={'#A596DB'}>{date}</Text>
                <Text fontSize={{ base: '12px', sm: '17px' }} color={'#A596DB'}>{blog.username}</Text>
                <Button fontSize={{ base: '12px', sm: '17px' }}
                    onClick={() => {
                        navigate(`/single-blog/${blog._id}`)
                    }}
                >View here</Button>
            </CardFooter>
        </Card>
    )
}

export default BlogCard