import { _decorator, Component, Node, view, log } from 'cc'
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
      node.destroy()
    }
  }

  // A 對準 B
  public static lookAtTarget(nodeA: Node, A: Node, B: Node) {
    if (!A.parent || !B.parent) return
    var cannon = A.getWorldPosition()
    var target = B.getWorldPosition()
    var dir = target.subtract(cannon) //目的地與發射點的方向相減
    var angle = (Math.atan2(dir.y, dir.x) * 180) / Math.PI
    nodeA.angle = angle - 90
  }

  // 敵人走路
  public static patrolMove(node: Node, moveSpeed: number) {
    log('patrolMove')
    if (!node.parent) return
    let x = node.getPosition().x
    let y = node.getPosition().y

    const case1 = (node, moveSpeed) => {
      x += -1.5 * moveSpeed
      y += +0.2 * moveSpeed
    }
    const case2 = (node, moveSpeed) => {
      x += -1.5 * moveSpeed
      y += +0.2 * moveSpeed
    }
    const case3 = (node, moveSpeed) => {
      x += +1.5 * moveSpeed
      y += -0.2 * moveSpeed
    }
    const case4 = (node, moveSpeed) => {
      x += +1.5 * moveSpeed
      y += -0.2 * moveSpeed
    }

    let randomResult = null

    // 每4秒換一個走法
    let timer1 = setInterval(
      () => {
        if (!node.parent) {
          clearInterval(timer1)
          log('clearInterval(timer1)')
          return
        }
        log('每4秒換一個走法', node)
        randomResult = Math.floor(Math.random() * 4)
      },
      2000,
      node,
      randomResult
    )

    // update
    let timer2 = setInterval(
      () => {
        if (!node.parent) {
          clearInterval(timer2)
          log('clearInterval(timer2)')
          return
        }
        switch (randomResult) {
          case 0:
            case1(node, moveSpeed)
            break
          case 1:
            case2(node, moveSpeed)
            break
          case 2:
            case3(node, moveSpeed)
            break
          case 3:
            case4(node, moveSpeed)
            break
        }
        node.setPosition(x, y)
      },
      60,
      node,
      moveSpeed,
      randomResult
    )
  }

  update(dt) {}
}
