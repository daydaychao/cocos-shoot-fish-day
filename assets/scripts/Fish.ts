import { _decorator, Component, Node, view, log } from 'cc'
import { MoveSystem } from './Systems/MoveSystem'
const { ccclass, property } = _decorator

@ccclass('Fish')
export class Fish extends Component {
  private moveSpeed = 200
  private aliveTime = 0

  public goto(x: number, y: number) {
    this.node.setPosition(x, y)
  }

  start() {
    // AI走路
    MoveSystem.patrolMove(this.node, this.moveSpeed)
  }

  update(dt: number) {
    // 跑到外面
    this.aliveTime += dt
    if (this.aliveTime > 3) {
      MoveSystem.destroyWhenTouchedGetOut(this.node)
    }
  }
}
