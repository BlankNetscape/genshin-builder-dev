import { MaximumPriority, FIFO } from "./queue"

describe('MaximumPriority', () => {
  let maxPriorityQueue: MaximumPriority<string>

  beforeEach(() => {
    maxPriorityQueue = new MaximumPriority()
  })

  it('should insert elements and return them in the correct order', () => {
    maxPriorityQueue.insert(3, 'A')
    maxPriorityQueue.insert(2, 'B')
    maxPriorityQueue.insert(5, 'C')
    expect(maxPriorityQueue.pop()).toBe('C')
    expect(maxPriorityQueue.pop()).toBe('A')
    expect(maxPriorityQueue.pop()).toBe('B')
    expect(maxPriorityQueue.pop()).toBeUndefined()
  })

  // Add more tests to cover other functionalities of MaximumPriority
})

describe('FIFO', () => {
  let fifoQueue: FIFO<string>

  beforeEach(() => {
    fifoQueue = new FIFO()
  })

  it('should push and pop elements in the correct order', () => {
    fifoQueue.push('A')
    fifoQueue.push('B')
    fifoQueue.push('C')
    expect(fifoQueue.pop()).toBe('A')
    expect(fifoQueue.pop()).toBe('B')
    expect(fifoQueue.pop()).toBe('C')
    expect(fifoQueue.pop()).toBeUndefined()
  })

  // Add more tests to cover other functionalities of FIFO
})
