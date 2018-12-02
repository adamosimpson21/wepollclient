import {xpToLevel} from '../helper/experience'

test("experience function", () => {
    expect(xpToLevel(5)).toBeGreaterThan(0)
})