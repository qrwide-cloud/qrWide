import { customAlphabet } from 'nanoid'

// Alphabet without ambiguous chars (0, O, I, l)
const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'
const generate = customAlphabet(alphabet, 6)

export function generateShortcode(): string {
  return generate()
}
