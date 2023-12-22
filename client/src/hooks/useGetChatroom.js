import React from 'react'
import {useQuery} from '@tanstack/react-query'
import http from '@/libs/http'

export const useGetChatroom = ({ code, username }) => useQuery({
  queryKey: ['chatrooms', code],
  queryFn: async () => {
    try {
      const res = await http.get(`/chatrooms/${code}?username=${username}`)
      const { data: {token, chatroom: {_id}} } = res.data

      setTimeout(() => {
        if (window) {
          localStorage.setItem('token', token)
          localStorage.setItem('username', username)
          localStorage.setItem('chatroomId', _id)
        }
      }, 500)
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  },
  throwOnError: true,
})
