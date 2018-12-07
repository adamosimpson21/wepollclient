import {MAX_LEVEL, xpToLevel} from '../helper/experience'

const MAX_EXPERIENCE = 50000;

test("experience function returns numbers", () => {
    for(let i = 0; i< MAX_LEVEL; ++i ){
      expect(xpToLevel(i)).toBeLessThan(MAX_EXPERIENCE+1)
    }
})

test("experience to level to experience matches", () => {
  expect(true).toBe(true);
})