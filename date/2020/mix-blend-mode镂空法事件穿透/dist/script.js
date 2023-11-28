document.querySelectorAll('.card').forEach((card, index) => {
  card.onclick = alert.bind(window, index)
})