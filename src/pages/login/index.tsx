import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import 'antd/dist/antd.css'
import axios from 'axios'
import { url } from '../../config'
import { useNavigate } from 'react-router-dom'
const Login = (props: any) =>
{
  let navigate = useNavigate()
  useEffect(() =>
  {
    const token = localStorage.getItem("token");
    if (token)
    {
      navigate('/products')
    }
  },[])
    const onFinish = async (values: any) =>
    {
        const params = new URLSearchParams();
        params.append('_username', values.username);
        params.append('_password', values.password);
        params.append('_subdomain', 'toko');
    try {
      const res = await axios.post(
        url + 'security/auth_check',
        params,
      )
        if (res.status === 200)
        {
        message.success('Successfully logged in')
        localStorage.setItem('token', res.data.token)
        window.location.pathname = 'products'
      }
    } catch (e:any) {
      message.error(`${e?.response?.data?.message}`)
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="flex-column">
      <div>
        <Form
          name="basic"
          style={{
            width: '300px',
            marginLeft: '50%',
            paddingTop: '100px',
            transform: 'translateX(-50%)',
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            style={{ fontSize: '20px' }}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{ borderRadius: '20px' }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password style={{ borderRadius: '20px' }} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' className="mt-2" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
