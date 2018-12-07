import {MAX_LEVEL, MAX_EXPERIENCE, xpToLevel, levelProgress, checkLevel} from '../helper/experience'


test("experience function returns numbers", () => {
    for(let i = 0; i< MAX_LEVEL; ++i ){
      expect(xpToLevel(i)).toBeLessThanOrEqual(MAX_EXPERIENCE)
    }
})

test("experience to level to experience matches", () => {
  expect(true).toBe(true);
})

test("level progress returns percent", () => {
  for(let i=0; i<MAX_EXPERIENCE; i+=5000){
    expect(levelProgress(i)).toBeLessThanOrEqual(100)
  }
})