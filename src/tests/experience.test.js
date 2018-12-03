import {MAX_LEVEL, xpToLevel} from '../helper/experience'

test("experience function", () => {
    for(let i = 1; i< MAX_LEVEL; i++ ){
      expect(xpToLevel(i)).toBeGreaterThan(-1)
    }
})