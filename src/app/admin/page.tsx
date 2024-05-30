import React from 'react'
import TopicForm from './topic-form'
import VideoForm from './video-form'

export default function Admin() {
  return (
    <div className=' flex h-screen justify-center items-center'>
      <TopicForm/>
      <VideoForm/>
    </div>
  )
}
