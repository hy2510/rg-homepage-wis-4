'use client'

import React from 'react'
import Image from 'next/image'

export default function Page() {
  return (
    <main className={`container`} style={{display: 'flex', justifyContent: 'center'}}>
      <Image src={'/src/images/@user-guide/rg_use_guide_school.jpg'} width={1080} height={15577} alt='' style={{width: '100%', maxWidth: '850px', height: 'auto', borderRadius: '20px', backgroundColor: '#ffffff50', padding: '10px'}} />
    </main>
  )
}
