'use client'

import { useState, type CSSProperties } from 'react'

type DeferredMapEmbedProps = {
  title: string
  src: string
  loadLabel: string
  height?: number
  className?: string
  style?: CSSProperties
  allowFullScreen?: boolean
}

export default function DeferredMapEmbed({
  title,
  src,
  loadLabel,
  height = 360,
  className,
  style,
  allowFullScreen = false,
}: DeferredMapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return (
      <iframe
        title={title}
        src={src}
        width="100%"
        height={String(height)}
        loading="lazy"
        style={{ border: 0, display: 'block' }}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen={allowFullScreen}
      />
    )
  }

  return (
    <div
      className={className}
      style={{
        minHeight: height,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 'inherit',
        ...style,
      }}
    >
      <button className="button" type="button" onClick={() => setIsLoaded(true)}>
        {loadLabel}
      </button>
    </div>
  )
}