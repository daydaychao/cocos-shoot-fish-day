import { _decorator, Component, view, CCInteger, find, assert, AudioSource, Node } from 'cc'
const { ccclass, property } = _decorator
import { MoveSystem } from './Systems/MoveSystem'

@ccclass('Fire')
export class Fire extends Component {
  @property(CCInteger)
  degree: number = 0

  @property(CCInteger)
  shootMovingSpeed: number = 500

  angleX: number = 0
  angleY: number = 0

  shootStart(degree, shootMovingSpeed) {
    this.degree = degree
    this.shootMovingSpeed = shootMovingSpeed

    var angle = (this.degree / 180) * Math.PI
    this.angleX = this.shootMovingSpeed * Math.cos(angle)
    this.angleY = this.shootMovingSpeed * Math.sin(angle)
    this.node.angle = this.degree - 90
  }
  shootMoving(dt) {
    var sx = this.angleX * dt
    var sy = this.angleY * dt
    let { x, y } = this.node.getPosition()
    this.node.setPosition(x + sx, y + sy)
  }

  update(dt) {
    this.shootMoving(dt)
    MoveSystem.destroyWhenTouchedGetOut(this.node)
  }
}
