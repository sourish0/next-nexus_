"use client"
import Slider from "@/components/Introduction";
import Cards from "@/components/cards";
import Image from "next/image";
import { useState, useEffect, use } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function Home() {

  const router = useRouter()
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)

  useEffect(() => {
      const setProvider = async () => {
          const response = await getProviders()
          setProviders(response)
      }
      setProvider()
  }, [])

  if(session) {
    const deleteDocSession = async () => {
      await axios.get('/api/logout')
    }

    deleteDocSession()
  }

  return (
    <main className="my-20 mx-20">
      <Slider />
      <Cards className="mx-20"/>
    </main>
  );
}
