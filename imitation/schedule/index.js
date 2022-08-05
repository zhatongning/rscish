// 主要调度策略是使用MessageChannl产生微任务
const messageChannel = new MessageChannel()
let scheduledCallback = null
const taskQueue = []
let lastStartTimeExecutingTask = -1
const MostTimeToExecuting = 5

let timeToExecute = 5
let wip = 1

messageChannel.port1.onmessage = function () {
  if (scheduledCallback !== null) {
    const isFinish = scheduledCallback()
    if (isFinish) {
      console.log('任务执行结束')
    } else {
      // 重新让任务进入  微任务队列 执行
      lastStartTimeExecutingTask = -1
      messageChannel.port2.postMessage(null)
    }
  }
}

function consumingWork() {
  let res = 0
  for (let i = 0; i < 10000; i++) {
    res += i
  }
}

function count() {
  // 答应的num可以看出是否是继续执行的
  if (wip++) {
     // 只是一个耗时任务，没有任务作用
    consumingWork()
    // 当前wip值
    console.log(wip)
  }
}

function shouldYield(startTime) {
  return (performance.now() - startTime) > MostTimeToExecuting
}


function mayTaskNeedLongTime(startTime) {
  // wip 存放之前的状态量，继续执行就是在其基础上做状态变更
  // 模拟react中的concurce mode下的 workLoopConcurrent 函数
  while (wip && !shouldYield(startTime)) {
    count(wip)
  }

  // 返回 下一次执行的函数
  return mayTaskNeedLongTime
}



function requestCalllback(callback) {
  scheduledCallback = callback
  // 在下一个微任务队列里 执行
  messageChannel.port2.postMessage(null)
}



function workLoop() {
  console.log('workLoop')
  while (taskQueue.length) {
    if (lastStartTimeExecutingTask !== -1 && performance.now() > (lastStartTimeExecutingTask + MostTimeToExecuting)) {
      break
    }
    const top = taskQueue[0]
    const startTime = lastStartTimeExecutingTask = performance.now()
    // 最主要的 可中断执行
    const continousCallback = top.callback(startTime)
    // 替换之前的callback为继续执行的callback
    top.callback = continousCallback
  }

  return timeToExecute-- === 0
}


function start() {
  //
  const mockATask = {
    callback: mayTaskNeedLongTime,
  }

  taskQueue.push(mockATask)

  // 开始循环执行任务
  requestCalllback(workLoop)

}



start()
