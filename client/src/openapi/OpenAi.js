
// Ensure environment variable is correctly read
import React  , {useEffect}from 'react'
import axios from "axios"
const key = "AIzaSyAblbn3N-w_XSytBQunjkT04WlWgzSAwIQ"


export async function sendMessageToOpenAI (message) {
  const res = axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}` , {"contents":[{"parts":[{"text":message}]}]})
  return res

}



