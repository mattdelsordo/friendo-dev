/**
 * Draws HAPPY BIRTHDAY over the birthday pal
 */
export default (g, x, y) => {
  g.save()

  g.font = '40px Comic Sans MS'
  g.fillStyle = 'mediumpurple'
  g.textAlign = 'center'
  g.fillText('HAPPY BIRTHDAY', x, y)

  g.restore()
}
