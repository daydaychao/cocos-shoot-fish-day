import { _decorator, Component, Prefab, CCInteger, Node, instantiate } from 'cc'
import { Fire } from './Fire'
const { ccclass, property } = _decorator
import { MoveSystem } from './Systems/MoveSystem'

@ccclass('Cannon')
export class Cannon extends Component {
  @property(Node)
  target: Node = null

  @property(Prefab)
  weapon: Prefab = null

  @property(Node)
  weaponRoot: Node = null

  @property(CCInteger)
  shootTime: number = 0.2 //連射速度0.2秒發射一顆

  @property(CCInteger)
  shootTimeCounter: number = 0 //連射計時器

  addFireAndShoot(deltaTime) {
    this.shootTimeCounter += deltaTime
    if (this.shootTimeCounter > this.shootTime) {
      const degree = this.node.angle + 90
      const fireNode = instantiate(this.weapon)
      this.weaponRoot.addChild(fireNode)
      fireNode.getComponent(Fire).shootStart(degree, 500)
      this.shootTimeCounter = 0
    }
  }

  update(deltaTime: number) {
    if (this.target) {
      MoveSystem.lookAtTarget(this.node, this.node, this.target)
    }
    this.addFireAndShoot(deltaTime)
  }
}
