import { _decorator, Component, Node, view } from 'cc'
const { ccclass, property } = _decorator

@ccclass('MoveSystem')
export class MoveSystem extends Component {
  // 撞到牆壁就刪除
  public static destroyWhenTouchedGetOut(node: Node) {
    let touchLeft = node.getWorldPosition().x < -view.getVisibleSize().x
    let touchRight = node.getWorldPosition().x > view.getVisibleSize().x
    let touchTop = node.getWorldPosition().y < -view.getVisibleSize().y
    let touchBottom = node.getWorldPosition().y < -view.getVisibleSize().y

    if (touchLeft || touchRight || touchTop || touchBottom) {
      if (node.name != 'Fire') console.log(node.name, '出界')
      node.removeFromParent()
    }
  }

  // A 對準 B
  public static lookAtTarget(nodeA: Node, A, B) {
    var cannon = A.getWorldPosition()
    var target = B.getWorldPosition()
    var dir = target.subtract(cannon) //目的地與發射點的方向相減
    var angle = (Math.atan2(dir.y, dir.x) * 180) / Math.PI
    nodeA.angle = angle - 90
  }

  // 敵人走路
  public static patrolMove(node: Node, moveSpeed: number, dt: number) {
    let x = node.getPosition().x - 20 * moveSpeed * dt
    let y = node.getPosition().y + 20 * moveSpeed * dt

    Math.random()
    node.setPosition(x, y)
  }

  start() {}

  update() {}
}
