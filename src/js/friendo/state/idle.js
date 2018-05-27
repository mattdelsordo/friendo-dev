import State from './state'

export default class Idle extends State {

  draw(g, x, y, friendo) {
    super.draw()


  }

  handleAction(action) {
    // based off of action and current state switch the state
    switch (action) {
      default:
        return
    }
  }
}
