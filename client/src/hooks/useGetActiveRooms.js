import React from 'react'
import {useQuery} from '@tanstack/react-query'
import http from '@/libs/http'

export const useGetActiveRooms = () => useQuery({
  queryFn: async () => {
    try {
      const res = await http.get(`/chatrooms`)
      return res.data
    } catch (error) {
      throw new Error(error)
    }
  },
  throwOnError: true,
})
