import {formatUrlToEmbed, isLink} from "./regexes";

test('isLink(\'https://www.twitch.tv\')', () => {
  expect(isLink('https://www.twitch.tv')).toBe(true);
})

test('isLink(\'http://wepoll.herokuapp.com/splash\')', () => {
  expect(isLink('http://wepoll.herokuapp.com/splash')).toBe(true);
})
test('isLink(\'https://bit.ly/2BZPMd8\')', () => {
  expect(isLink('https://bit.ly/2BZPMd8')).toBe(true);
})
test('isLink(\'http://localhost:3000/question\')', () => {
  expect(isLink('http://localhost:3000/question')).toBe(true);
})
test('isLink(\'www.google.com\')', () => {
  expect(isLink('www.google.com')).toBe(true);
})

test('isLink(\'myimage.png\')', () => {
  expect(isLink('myimage.png')).toBe(false);
})
test('isLink(\'just a string\')', () => {
  expect(isLink('just a string')).toBe(false);
})
test('isLink(\'Some random sentences. They have punctuation! And colons: like this one; and some slashes // comment here\')', () => {
  expect(isLink('Some random sentences. They have punctuation! And colons: like this one; and some slashes // comment here')).toBe(false);
})

test('formats url to embed url properly', () => {
  expect(formatUrlToEmbed('just a string')).toBe('Not a valid Link')
})

test('formats url to embed number', () => {
  expect(formatUrlToEmbed(151254)).toBe('URL could not be parsed as string')
})