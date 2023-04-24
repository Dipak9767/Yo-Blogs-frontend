import { Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../Utils/ToastMessage'
import { BASE_URL } from '../Config'


const Register = () => {
    const [user , setUser ] = useState({
        name:"",
        Username:"",
        email:"",
        password:""
    })

    const { toastMessage } = ToastMessage()
    const navigate = useNavigate()

    const submitHandler = async(e) =>{
        e.preventDefault();
        try {
          const res = await  axios.post(BASE_URL+"auth/register" , user)
          console.log(res)
          toastMessage(res.data);

          if(res.data.status === 200){
            navigate('/login')
          }
          
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Flex h="100vh" alignItems="center" justifyContent="center" >
            <Flex
                flexDirection="column"
                bg='#e1e2f7'
                p={12}
                borderRadius={8}
            >
                <Heading mb={6}>Register</Heading>
                <Input
                    placeholder='Name'
                    type="text"
                    variant="filled"
                    mb={6}
                    value={user.name}
                    onChange={(e)=> setUser({...user , name:e.target.value})}
                />
                <Input
                    placeholder='UserName'
                    type="text"
                    variant="filled"
                    mb={6}
                    value={user.username}
                    onChange={(e)=> setUser({...user , username:e.target.value})}
                />
                <Input
                    placeholder='Email'
                    type="email"
                    variant="filled"
                    mb={6}
                    value={user.email}
                    onChange={(e)=> setUser({...user , email:e.target.value})}
                />
                <Input
                    placeholder='Password'
                    type="password"
                    variant="filled"
                    value={user.password}
                    onChange={(e)=> setUser({...user , password:e.target.value})}
                    mb={6}
                />
                <Button bg={'#7A6BB0'} color={'white'} mb={8} onClick={submitHandler} className='btn'>
                    Register
                </Button>
                <FormLabel>
                    Already have an account? <Link to={'/login'}> Log In</Link>
                </FormLabel>
                
            </Flex>
        </Flex>
    )
}

export default Register