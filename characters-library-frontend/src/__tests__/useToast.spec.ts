import { describe, it, expect, beforeEach } from 'vitest'
import { useToast } from '@/composables/useToast'

describe('useToast', () => {

  beforeEach(() => {
    const { toasts } = useToast()
    toasts.value = []
  })

  it('success() adds a toast with type success', () => {
    const { toasts, success } = useToast()
    success('Done!')
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0]!.type).toBe('success')
    expect(toasts.value[0]!.message).toBe('Done!')
  })

  it('error() adds a toast with type error', () => {
    const { toasts, error } = useToast()
    error('Something went wrong')
    expect(toasts.value[0]!.type).toBe('error')
  })

  it('info() adds a toast with type info', () => {
    const { toasts, info } = useToast()
    info('FYI')
    expect(toasts.value[0]!.type).toBe('info')
  })

  it('remove() deletes toast by id', () => {
    const { toasts, info, remove } = useToast()
    info('Test')
    const id = toasts.value[0]!.id
    remove(id)
    expect(toasts.value.find(t => t.id === id)).toBeUndefined()
  })

  it('multiple toasts can coexist', () => {
    const { toasts, success, error } = useToast()
    success('A'); error('B')
    expect(toasts.value.length).toBe(2)
  })

})
