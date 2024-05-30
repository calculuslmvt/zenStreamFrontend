"use client";
import { useUserStore } from '@/store/store';
import React from 'react'

function Logout() {

  const updateUsername = useUserStore((state) => state.updateUsername);
  updateUsername(""); 
  window.sessionStorage.setItem("username", ""); 
  location.replace("/");
  return (
    <div>
        Logout success !!
    </div>
  )
}

export default Logout; 
