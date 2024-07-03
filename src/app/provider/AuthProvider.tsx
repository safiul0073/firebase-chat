'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import theme from '@/configs/theme';
const AuthProvider = ({
    children,
    initialSession,
  }: {
    children: React.ReactNode;
    initialSession?: Session | null;
  }) => {
  return (
    <SessionProvider session={initialSession} refetchInterval={120}>
      <AntdRegistry>
        <ConfigProvider theme={theme}>
        {children}
        </ConfigProvider>
      </AntdRegistry>
    </SessionProvider>
  )
}

export default AuthProvider