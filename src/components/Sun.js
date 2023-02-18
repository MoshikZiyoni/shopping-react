import React from 'react'

function Sun() {
  return (
    <div className="sun-container">
        <div className="ray-container">
          <div className="ray">
            <div className="ray-inner" />
          </div>
          <div className="ray">
            <div className="ray-inner" />
          </div>
          <div className="ray">
            <div className="ray-inner" />
          </div>
        </div>
        <div className="face">
          <div className="eye-container">
            <div className="eye" />
            <div className="eye" />
          </div>
          <div className="mouth-container">
            <div className="mouth" />
          </div>
        </div>
      </div>
  )
}

export default Sun