import React from 'react'
import {useMutation} from '@tanstack/react-query'
import http from '@/libs/http.js'
import {useNavigate} from 'react-router-dom'

export const useLeaveChatroom = (code) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      try {
        const res = await http.delete(`/chatrooms/${code}`, {
          headers: {
            'X-Access-Token': localStorage.getItem('token')
          }
        })

        return res.data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('chatroomId')
      navigate(-1)
    },
    onError: (error) => {
      console.error(error)
      navigate(-1)
    },
  })
}
