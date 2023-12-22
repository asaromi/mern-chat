import React from 'react'
import {useMutation} from '@tanstack/react-query'
import http from '@/libs/http.js'

export const useSendChat = ({ message, onSent }) => useMutation({
  mutationFn: async () => {
    try {
      const res = await http.post(`/chats/send`, {
        message
      }, {
        headers: {
          'X-Access-Token': localStorage.getItem('token')
        }
      })

      return res.data
    } catch (error) {
      throw new Error(error)
    }
  },
  onSuccess: ({ data }) => {
    onSent(data)
  },
  throwOnError: true,
})
