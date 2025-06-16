import { useState, useEffect } from 'react'
import viteLogo from '/logo-white.png'
import './App.css'

const totalSlides = 41

function App() {
  const [currentSlide, setCurrentSlide] = useState(1)

  useEffect(() => {
    // Preload all slide images
    for (let i = 1; i <= totalSlides; i++) {
      const img = new Image()
      img.src = `/slides/slide${i}.jpg`
    }
  }, [])

  const handleClick = (e) => {
    const clickX = e.clientX
    const screenWidth = window.innerWidth

    if (clickX > screenWidth / 2) {
      setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1))
    } else {
      setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides))
    }
  }

  return (
    <>
      <div
        id="background"
        onClick={handleClick}
        style={{
          backgroundImage: `url(/slides/slide${currentSlide}.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          cursor: 'pointer',
        }}
      >
        <div id="nav">
          <img src={viteLogo} className="logo" alt="Vite logo" onClick={() => setCurrentSlide(1)} />
          <a href="https://shop.doomedwork.com" target="_blank">Shop</a>
        </div>
      </div>
    </>
  )
}

export default App
