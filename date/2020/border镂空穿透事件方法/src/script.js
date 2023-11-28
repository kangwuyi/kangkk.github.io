const handler = document.querySelector('#handler')
const rect = handler.querySelector('.border')

handler.addEventListener('mousemove', e => {
  const x = e.clientX
  const y = e.clientY

  if (x > 150 && x < 450 && y > 100 && y < 300) {
    rect.style.pointerEvents = 'none'
  } else {
    rect.style.pointerEvents = 'auto'
  }
}, false)
