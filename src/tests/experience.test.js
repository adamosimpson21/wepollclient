import {MAX_LEVEL, MAX_EXPERIENCE, levelProgress, checkLevel} from '../helper/experience'

test("check level returns a number less than MAX_LEVEL", () => {
  for(let i=0; i<=MAX_EXPERIENCE; i+=5000){
    expect(checkLevel(i)).toBeLessThanOrEqual(MAX_LEVEL)
  }
})

test("check level returns a number greater than 0", () => {
  for(let i=0; i<=MAX_EXPERIENCE; i+=5000){
    expect(checkLevel(i)).toBeGreaterThanOrEqual(0)
  }
})

test("level progress returns values below 100", () => {
  for(let i=0; i<=MAX_EXPERIENCE; i+=5000){
    expect(levelProgress(i)).toBeLessThanOrEqual(100)
  }
})

test("level progress returns values above 0", () => {
  for(let i=0; i<=MAX_EXPERIENCE; i+=5000){
    expect(levelProgress(i)).toBeGreaterThanOrEqual(0)
  }
})