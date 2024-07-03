"use client"
import { Button, Form, Input } from "antd";
import React from "react";
import { useRouter } from 'next/navigation'

export const RegistrationForm = () => {
    const router = useRouter();
    const handleSubmit = (values: any) => {
        fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then((res) => {
            if (res.status === 200) {
                router.push("/auth/login");
            }
        })
    }
  return (
    <div className="flex flex-col items-center justify-right">
      <Form
        name="basic"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>
        <Button htmlType="submit">SignUp</Button>
      </Form>
    </div>
  );
};
