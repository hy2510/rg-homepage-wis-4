'use client'

import { useEffect, useState } from 'react'

export default function Client() {
  const [linker, setLinker] = useState('')
  useEffect(() => {
    setTimeout(() => {
      //   setLinker('https://www.readinggate.com/Payment/Price')
      setLinker(
        'https://fcmobile.inicis.com/smart/wcard/?isBlockBack=aoneedu00120240808112129784027&payType=wcard',
      )
    }, 2000)
  }, [])

  useEffect(() => {
    const listener = (event: any) => {
      console.log(event)
      const data = event.data
      console.log('parent calling the child method', data)
    }
    window.addEventListener('message', listener)
    return () => {
      window.removeEventListener('message', listener)
    }
  }, [])

  return (
    <>
      <div>Bridge</div>
      <button
        onClick={() => {
          parent.postMessage('p', '*')
        }}>
        Send
      </button>
      {linker && (
        <iframe src={'/src/sample.html'} width={'100%'} height={'1024px'} />
      )}
    </>
  )
}
