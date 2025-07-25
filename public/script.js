const totalSlides = 41
const logoBlack = [2, 6, 9, 14, 30, 32]
const logoWhite = [3, 4, 5, 12, 20, 21, 28, 31, 33, 39]
let currentSlide = 1

function createSlidePicture(i) {
  // Paths for each resolution and format
  const jpg1920 = `./slides/slide${i}_1920.jpg`;
  const jpg2560 = `./slides/slide${i}_2560.jpg`;
  const jpg3840 = `./slides/slide${i}_3840.jpg`;
  const webp1920 = `./slides/webp_output/slide${i}_1920.webp`;
  const webp2560 = `./slides/webp_output/slide${i}_2560.webp`;
  const webp3840 = `./slides/webp_output/slide${i}_3840.webp`;

  const $picture = $('<picture>')
    // WebP sources
    .append(
      $('<source>')
        .attr('srcset', webp3840)
        .attr('type', 'image/webp')
        .attr('media', '(min-width: 3000px)')
    )
    .append(
      $('<source>')
        .attr('srcset', webp2560)
        .attr('type', 'image/webp')
        .attr('media', '(min-width: 2000px)')
    )
    .append(
      $('<source>')
        .attr('srcset', webp1920)
        .attr('type', 'image/webp')
    )
    // JPEG sources
    .append(
      $('<source>')
        .attr('srcset', jpg3840)
        .attr('type', 'image/jpeg')
        .attr('media', '(min-width: 3000px)')
    )
    .append(
      $('<source>')
        .attr('srcset', jpg2560)
        .attr('type', 'image/jpeg')
        .attr('media', '(min-width: 2000px)')
    )
    .append(
      $('<source>')
        .attr('srcset', jpg1920)
        .attr('type', 'image/jpeg')
    );

  // Fallback <img> (1920px JPEG)
  const $img = $('<img>')
    .attr('src', jpg1920)
    .addClass('slide')
    .attr('id', `slide${i}`)
    .attr('alt', `Slide ${i}`)
    .attr('loading', 'lazy')
    .attr('sizes', '(max-width: 800px) 100vw, 800px');

  $picture.append($img);
  return $picture;
}

$(document).ready(function () {
  // Only add current, previous, and next slide images
  const slidesToLoad = [
    ((currentSlide - 2 + totalSlides) % totalSlides) + 1, // previous
    currentSlide, // current
    (currentSlide % totalSlides) + 1 // next
  ];
  slidesToLoad.forEach(i => {
    const $picture = createSlidePicture(i);
    if (i === currentSlide) $picture.find('img').addClass('active');
    $('#slideshow').append($picture);
  });

  preloadAdjacent(currentSlide);
  swapToHighRes(currentSlide);

  $('.left').on('click', () => {
    currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
    showSlide(currentSlide);
  });

  $('.right').on('click', () => {
    currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
    showSlide(currentSlide);
  });

  $('#logo').on('click', function (e) {
    e.preventDefault();
    currentSlide = 1;
    showSlide(currentSlide);
  });
});

function ensureSlideInDOM(i) {
  // Only add if the slide's <img> does not already exist in the DOM
  if ($(`#slide${i}`).length > 0) return;
  const $picture = createSlidePicture(i);
  $('#slideshow').append($picture);
}

function showSlide(n) {
  // Calculate prev and next first
  const prev = ((n - 2 + totalSlides) % totalSlides) + 1;
  const next = (n % totalSlides) + 1;
  [prev, n, next].forEach(ensureSlideInDOM);

  $('.slide').removeClass('active');
  $(`#slide${n}`).addClass('active');
  swapToHighRes(n);
  preloadAdjacent(n);
  switchLogo(n);
}

function swapToHighRes(n) {
  const $picture = $(`#slide${n}`).closest('picture')
  const $img = $picture.find('img')
  const hiresJpg = $img.attr('data-hires-jpg')
  const hiresWebp = $img.attr('data-hires-webp')

  // Update <source> elements
  $picture.find('source[type="image/webp"]').attr('srcset', hiresWebp)
  $picture.find('source[type="image/jpeg"]').attr('srcset', hiresJpg)

  // Update <img> fallback
  $img.attr('src', hiresJpg)

  // Optionally, add a class to indicate high-res is loaded
  $img.addClass('hires')
}

function preloadAdjacent(n) {
  for (let offset = -2; offset <= 2; offset++) {
    let i = ((n - 1 + offset + totalSlides) % totalSlides) + 1
    const $img = $(`#slide${i}`)
    if ($img.length && !$img.hasClass('hires')) {
      const hiresJpg = $img.attr('data-hires-jpg')
      const hiresWebp = $img.attr('data-hires-webp')
      // Preload hires WebP
      if (hiresWebp) {
        const preloaderWebp = new Image()
        preloaderWebp.src = hiresWebp
      }
      // Preload hires JPEG
      if (hiresJpg) {
        const preloaderJpg = new Image()
        preloaderJpg.src = hiresJpg
      }
    }
  }
}

function switchLogo(n) {
  const $logoImg = $('#logo img')
  const $shopText = $('#shop')

  if (logoBlack.includes(n)) {
    $logoImg.css("filter", "brightness(0)")
    $shopText.css("color", "#000000")
  } else if (logoWhite.includes(n)) {
    $logoImg.css("filter", "brightness(100)")
    $shopText.css("color", "#FFFFFF")
  } else {
    $logoImg.css("filter", "brightness(1)")
    $shopText.css("color", "#FF0647")
  }
}