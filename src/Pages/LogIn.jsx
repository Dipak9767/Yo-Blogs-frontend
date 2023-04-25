import { Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastMessage } from '../Utils/ToastMessage'
import { useDispatch } from 'react-redux'
import { logInUser} from '../Redux/Actions'
import { BASE_URL } from '../Config'

const LogIn = () => {
    const [user, setUser] = useState({
        loginId: "",
        password: ""
    })

    const { toastMessage } = ToastMessage()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(BASE_URL+"auth/login", user)
            let userbio = { userInfo: res.data.data, isAuth: true }
            console.log(userbio)
            dispatch({
                type: logInUser,
                payload: userbio
            })
            localStorage.setItem('bloguser', JSON.stringify(userbio))
            toastMessage(res.data);
            if (res.data.status === 200) {
                navigate('/')
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
                <Heading mb={6}>Log In</Heading>
                <Input
                    placeholder='Name'
                    type="text"
                    variant="filled"
                    mb={6}
                    value={user.loginId}
                    onChange={(e) => setUser({ ...user, loginId: e.target.value })}
                />
                <Input
                    placeholder='Password'
                    type="password"
                    variant="filled"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    mb={6}
                />
                <Button bg={'#7A6BB0'} color={'white'} mb={8} onClick={submitHandler} className='btn'>
                    Log In
                </Button>
                <FormLabel>
                    Don't have an Account? <Link to={'/register'}>Register</Link>
                </FormLabel>

            </Flex>
        </Flex>
    )
}

export default LogIn