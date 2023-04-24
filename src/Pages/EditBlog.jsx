
import BlogForm from '../Components/BlogForm'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { BASE_URL } from '../Config';

const EditBlog = () => {
    const { id } = useParams();
    
    const [blogData, setBlogData] = useState();
    const [isEdit, setIsEdit] = useState(false);


    const fetchBlog = async () => {
        try {
            const blog = await axios.get(`${BASE_URL}blog/single-blog?blogID=${id}`);
            setBlogData(blog.data.data)
            setIsEdit(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [])
    return (
        <BlogForm blogData={blogData} isEdit={isEdit} />
    )
}

export default EditBlog