const totalSlides = 41
const logoBlack = [2, 6 ]
const logoRed = [1, 3, 4, 5]
let currentSlide = 1

$(document).ready(function () {
  // Add all slide images
  for (let i = 1; i <= totalSlides; i++) {
    const $img = $('<img>')
      .attr('src', `./public/slides/compressed/slide${i}.jpg`)
      .attr('data-hires', `./public/slides/slide${i}.jpg`)
      .addClass('slide')
      .attr('id', `slide${i}`)

    if (i === 1) $img.addClass('active')
    $('#slideshow').append($img)
  }

  preloadAdjacent(currentSlide)

  $('.left').on('click', () => {
    currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides
    showSlide(currentSlide)
  })

  $('.right').on('click', () => {
    currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1
    showSlide(currentSlide)
  })

  $('#logo').on('click', function (e) {
    e.preventDefault()
    currentSlide = 1
    showSlide(currentSlide)
  })
})

function showSlide(n) {
  $('.slide').removeClass('active')
  $(`#slide${n}`).addClass('active')
  swapToHighRes(n)
  preloadAdjacent(n)
  switchLogo(n)
}

function swapToHighRes(n) {
  const $img = $(`#slide${n}`)
  if (!$img.hasClass('hires')) {
    $img.attr('src', $img.data('hires'))
    $img.addClass('hires')
  }
}

function preloadAdjacent(n) {
  for (let offset = -2; offset <= 2; offset++) {
    let i = ((n - 1 + offset + totalSlides) % totalSlides) + 1
    const $img = $(`#slide${i}`)
    if ($img.length && !$img.hasClass('hires')) {
      const hiresSrc = $img.data('hires')
      const preloader = new Image()
      preloader.src = hiresSrc
    }
  }
}

function switchLogo(n) {
  const $logoImg = $('#logo img')

  if (logoBlack.includes(n)) {
    $logoImg.attr('src', './public/logo-black.png')
  } else if (logoRed.includes(n)) {
    $logoImg.attr('src', './public/logo-red.png')
  }
}