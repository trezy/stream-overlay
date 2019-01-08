// Module imports
import React, { useState } from 'react'
import uuid from 'uuid/v4'





const ProgressBar = ({ max = 100, value = 0 }) => {
  const currentCompletion = parseInt(value) / parseInt(max)
  const padding = 4
  
  const [id] = useState(uuid())
  
  return (
    <svg 
      className="progress-bar"
      data-max={max}
      data-value={value}
      height="48px"
      style={{ verticalAlign: 'initial' }}
      width="100%">
      <defs>
        <text
          alignmentBaseline="middle"
          className="percentage-complete"
          dy="50%"
          id={`${id}-progress-value`}
          x={`${padding}px`}
          y="0">
          {currentCompletion * 100}%
        </text>
        
        <rect
          fill="#0093c7"
          id={`${id}-progress-value-bar`}
          style={{
            height: `calc(100% - ${padding * 2}px)`,
            width: `calc(${currentCompletion * 100}% - ${padding * 2}px)`,
          }} />

        <clipPath id={`${id}-progress-value-bar-clip-path`}>
          <use href={`#${id}-progress-value-bar`} />
        </clipPath>
      </defs>
      
      <rect
        fill="white"
        height="100%"
        width="100%" />

      <g
        style={{
          height: `calc(100% - ${padding * 2}px)`,
          width: '100%',
        }}
        transform={`translate(${padding}, ${padding})`}>
        <use
          fill="black"
          href={`#${id}-progress-value`} />
        
        <use href={`#${id}-progress-value-bar`} />

        <use
          clipPath={`url(#${id}-progress-value-bar-clip-path)`}
          fill="white"
          href={`#${id}-progress-value`} />
      </g>
    </svg>
  )
}





export { ProgressBar }