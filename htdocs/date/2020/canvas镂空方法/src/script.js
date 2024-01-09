document.querySelectorAll('.text').forEach(item => {
  item.textContent = 'canvas镂空方法'.repeat(50)
})

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const sw = canvas.parentNode.offsetWidth
const sh = canvas.parentNode.offsetHeight

canvas.width = sw
canvas.height = sh
ctx.fillStyle = 'rgba(0, 0, 0, .5)'
ctx.fillRect(0, 0, sw, sh)

ctx.beginPath()
roundRect(ctx, 100, 100, 100, 100, 50)
ctx.clip()

ctx.clearRect(0, 0, sw, sh)