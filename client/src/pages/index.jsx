import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useGetActiveRooms} from '@/hooks/useGetActiveRooms'

const initialForm = {
  username: '',
  chatroom: '',
}

function Home() {
  const { data: responseRooms, isLoading } = useGetActiveRooms()

  const [form, setForm] = React.useState(initialForm)
  const [activeRooms, setActiveRooms] = React.useState([])
  const [submitLoading, setSubmitLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target || {}
    setForm((prev) => ({...prev, [name]: value}))
  }

  const resetForm = () => {
    setForm(() => initialForm)
  }

  const handleJoinChatroom = () => {
    const payload = {...form}
    if (!payload.username || !payload.chatroom) return alert('Missing required fields')

    localStorage.setItem('username', payload.username)

    setSubmitLoading(() => true)

    setTimeout(() => {
      setSubmitLoading(() => false)
      navigate(`/chatrooms/${payload.chatroom}`)
    }, 1000)
  }

  const pickChatroom = (e) => {
    const value = e.target?.value || e.target?.innerText
    setForm((prev) => ({...prev, chatroom: value}))
  }

  useEffect(() => {
    if (!isLoading && responseRooms) {
      setActiveRooms(() => (responseRooms.data))
    }
  }, [responseRooms, isLoading])

  useEffect(() => {
    localStorage.removeItem('username')
    localStorage.removeItem('chatroomId')
    localStorage.removeItem('token')

    return resetForm
  }, [])

  return (
    <main className="w-full max-w-mobile mx-auto pt-14 relative">
      <header className="fixed top-0 w-full max-w-mobile flex items-center h-14 bg-gray-700 px-5">
        <h1 className="text-white mb-1 text-xl font-bold">Mern Chat</h1>
      </header>

      <section className="w-full block px-5 pt-2.5 pb-40 space-y-3.5">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-medium">Username *</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            name="username"
            placeholder="Your username"
            type="text"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-medium">Chatroom Code *</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs text-base"
            name="chatroom"
            placeholder="Chatroom Code"
            type="text"
            value={form.chatroom}
            onChange={handleChange}
          />
        </div>

        {activeRooms.length > 0 && (
          <>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text font-medium">There is an active rooms</span>
              </label>

              <div className="space-x-2">
                {activeRooms.map((room, index) => (
                  <button
                    className="badge badge-neutral"
                    key={index}
                    onClick={pickChatroom}
                  >
                    {room.code}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <footer className="w-full block py-2.5 px-5 absolute bottom-0">
        <div className="flex justify-center">
          <button
            className={`btn w-full max-w-xs text-white text-base ${submitLoading ? 'btn-disabled pointer-events-none' : 'bg-gray-700'}`}
            onClick={handleJoinChatroom}
          >
            {submitLoading && <span className="loading loading-spinner"/>}
            Join
          </button>
        </div>
      </footer>
    </main>
  )
}

export default Home
