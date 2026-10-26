import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'
import { usePoll } from '../../src/composables/usePoll'

/** Lets the tick's promise settle, so the next one is scheduled. */
const settle = () => vi.advanceTimersByTimeAsync(0)

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('usePoll', () => {
  it('ticks at once, then once per interval after each settles', async () => {
    const scope = effectScope()
    const tick = vi.fn(async () => true)
    const poll = scope.run(() => usePoll(tick, 1000))!

    poll.start()
    await settle()
    expect(tick).toHaveBeenCalledTimes(1)
    expect(poll.polling.value).toBe(true)

    await vi.advanceTimersByTimeAsync(999)
    expect(tick).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(tick).toHaveBeenCalledTimes(2)
    scope.stop()
  })

  it('never overlaps: the next tick waits for a slow one to answer', async () => {
    const scope = effectScope()
    let answer: (again: boolean) => void = () => {}
    const tick = vi.fn(() => new Promise<boolean>((resolve) => (answer = resolve)))
    const poll = scope.run(() => usePoll(tick, 100))!

    poll.start()
    await vi.advanceTimersByTimeAsync(1000)
    expect(tick).toHaveBeenCalledTimes(1)

    answer(true)
    await vi.advanceTimersByTimeAsync(100)
    expect(tick).toHaveBeenCalledTimes(2)
    scope.stop()
  })

  it('stops when a tick says it is done, or throws', async () => {
    const scope = effectScope()
    const done = scope.run(() => usePoll(async () => false, 100))!
    done.start()
    await settle()
    expect(done.polling.value).toBe(false)

    const failing = vi.fn(async () => {
      throw new Error('down')
    })
    const broken = scope.run(() => usePoll(failing, 100))!
    broken.start()
    await vi.advanceTimersByTimeAsync(1000)
    expect(failing).toHaveBeenCalledTimes(1)
    expect(broken.polling.value).toBe(false)
    scope.stop()
  })

  it('stops with the scope it was made in', async () => {
    const scope = effectScope()
    const tick = vi.fn(async () => true)
    const poll = scope.run(() => usePoll(tick, 100))!
    poll.start()
    await settle()

    scope.stop()
    await vi.advanceTimersByTimeAsync(1000)
    expect(tick).toHaveBeenCalledTimes(1)
    expect(poll.polling.value).toBe(false)
  })

  it('schedules nothing from a tick that answers after a stop, or into a restart', async () => {
    const scope = effectScope()
    const answers: ((again: boolean) => void)[] = []
    const tick = vi.fn(() => new Promise<boolean>((resolve) => answers.push(resolve)))
    const poll = scope.run(() => usePoll(tick, 100))!

    poll.start()
    poll.stop()
    poll.start()
    expect(tick).toHaveBeenCalledTimes(2)

    // The first run's tick answers late: it is over, and goes no further.
    answers[0]!(true)
    answers[1]!(true)
    await vi.advanceTimersByTimeAsync(100)
    expect(tick).toHaveBeenCalledTimes(3)
    scope.stop()
  })

  it('starts once however often it is started', async () => {
    const scope = effectScope()
    const tick = vi.fn(async () => true)
    const poll = scope.run(() => usePoll(tick, 100))!
    poll.start()
    poll.start()
    await settle()
    expect(tick).toHaveBeenCalledTimes(1)
    scope.stop()
  })
})
