import { _decorator, Component, Node, view, log } from 'cc'
import { MoveSystem } from './Systems/MoveSystem'
const { ccclass, property } = _decorator

@ccclass('Fish')
export class Fish extends Component {
  public x = 0
  public y = 0
  private aliveTime = 0

  public goto(x: number, y: number) {
    this.node.setPosition(x, y)
  }

  update(dt: number) {
    this.aliveTime += dt
    if (this.aliveTime > 3) {
      MoveSystem.destroyWhenTouchedGetOut(this.node)
    }
    // log(this.aliveTime)
    // log(this.node.getPosition())
    MoveSystem.patrolMove(this.node, 100, dt)
  }
}
