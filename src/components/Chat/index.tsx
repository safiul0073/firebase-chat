import React from 'react'
import MessageList from './messages'
import MessageForm from './send-message'
import { Users } from './Users'

const index = () => {
  return (
    <div className="flex flex-row gap-2 p-12">
      <div className='w-1/4'>
          <Users />
      </div>
      <div className='w-3/4 flex flex-col'>
      <MessageList />
      <MessageForm />
      </div>
    </div>
    
  )
}

export default index
