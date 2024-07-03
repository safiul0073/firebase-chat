"use client";
import React, { useEffect } from "react";

import { Button, Form, Input  } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.push("/")
    }
  },[session, router])
  const handleSubmit = (values: any) => {
    signIn("credentials", { ...values, redirect: false });
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          
        >
          <Input  type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input  type="password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default SignIn;
