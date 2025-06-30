import { useState } from 'react'
import viteLogo from '/logo-white.png'
import './App.css'

const totalSlides = 41

function App() {
  const [currentSlide, setCurrentSlide] = useState(1)

  const handleClick = (e) => {
    const clickX = e.clientX
    const screenWidth = window.innerWidth

    if (clickX > screenWidth / 2) {
      setCurrentSlide(prev => (prev < totalSlides ? prev + 1 : 1))
    } else {
      setCurrentSlide(prev => (prev > 1 ? prev - 1 : totalSlides))
    }
  }

  const slides = []
  for (let i = 1; i <= totalSlides; i++) {
    slides.push(
      <img
        key={i}
        src={`/slides/slide${i}.jpg`}
        className={`slide ${i === currentSlide ? 'visible' : ''}`}
        alt={`Slide ${i}`}
      />
    )
  }

  return (
    <div id="background" onClick={handleClick}>
      {slides}
      <div id="nav">
        <img src={viteLogo} className="logo" alt="Vite logo" onClick={() => setCurrentSlide(1)} />
        <a href="https://shop.doomedwork.com" target="_blank">Shop</a>
      </div>
    </div>
  )
}

export default App
