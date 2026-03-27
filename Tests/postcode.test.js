import { expect, test } from 'vitest'
import { checkPostcode } from "../src/hooks/dataManager";

test('Expcted invalid postcode to return false', () => {
  expect(checkPostcode("WW")).toBe(false)
})

test('Expcted valid postcode to return true', () => {
  expect(checkPostcode("E1 3RZ")).toBe(true)
})

test('Expcted empty postcode to return true', () => {
  expect(checkPostcode("")).toBe(false)
})


test('Expcted postcode with only spaces to return false', () => {
  expect(checkPostcode("      ")).toBe(false)
})
