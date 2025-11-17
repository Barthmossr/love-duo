import { render, fireEvent } from '@testing-library/react-native'
import React from 'react'

import { Input } from '@/components/Input'

describe('Input', () => {
  it('should render correctly with value', () => {
    const { getByDisplayValue } = render(
      <Input value="Test Value" onChangeText={jest.fn()} placeholder="Enter text" />
    )

    expect(getByDisplayValue('Test Value')).toBeDefined()
  })

  it('should call onChangeText when text changes', () => {
    const handleChangeText = jest.fn()
    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={handleChangeText} placeholder="Enter text" />
    )

    const input = getByPlaceholderText('Enter text')
    fireEvent.changeText(input, 'New text')

    expect(handleChangeText).toHaveBeenCalledWith('New text')
  })

  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={jest.fn()} placeholder="Test placeholder" />
    )

    expect(getByPlaceholderText('Test placeholder')).toBeDefined()
  })

  it('should be editable by default', () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={jest.fn()} placeholder="Enter text" />
    )

    const input = getByPlaceholderText('Enter text')
    expect(input.props.editable).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={jest.fn()} placeholder="Enter text" disabled={true} />
    )

    const input = getByPlaceholderText('Enter text')
    expect(input.props.editable).toBe(false)
  })

  it('should apply disabled style when disabled', () => {
    const { getByPlaceholderText } = render(
      <Input value="" onChangeText={jest.fn()} placeholder="Enter text" disabled={true} />
    )

    const input = getByPlaceholderText('Enter text')
    expect(input.props.style).toContainEqual(expect.objectContaining({ opacity: 0.5 }))
  })
})
