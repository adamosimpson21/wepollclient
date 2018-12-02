import {defaultUserDemographics, familySizeRange, incomeRange, raceOptions, genderOptions, educationOptions, locationOptions} from "../helper/demographicsOptions";
import {ageRange} from "../helper/demographicsOptions";
import {mockUser} from "./mockData";

const isBetween = (value, range) => {
  return range[0] <= value && value <=range[1]
}

test("Default user age exist in options", () =>  {
  expect(isBetween(defaultUserDemographics.age, ageRange)).toBe(true)
})

test("Default user income exist in options", () =>  {
  expect(isBetween(defaultUserDemographics.income, incomeRange)).toBe(true)
})

test("Default user familySize exist in options", () =>  {
  expect(isBetween(defaultUserDemographics.familySize, familySizeRange)).toBe(true)
})

test("Default user race exist in options", () =>  {
  expect(raceOptions.includes(defaultUserDemographics.race)).toBe(true)
})

test("Default user gender exist in options", () =>  {
  expect(genderOptions.includes(defaultUserDemographics.gender)).toBe(true)
})

test("Default user education exist in options", () =>  {
  expect(educationOptions.includes(defaultUserDemographics.education)).toBe(true)
})

test("Default user location exist in options", () =>  {
  expect(locationOptions.includes(defaultUserDemographics.location)).toBe(true)
})

test("User's demographics included in ranges", () =>  {
  const user = mockUser
  expect(isBetween(user.age, ageRange) &&
    isBetween(user.income, incomeRange) &&
    isBetween(user.familySize, familySizeRange) &&
    genderOptions.includes(user.gender) &&
    locationOptions.includes(user.location) &&
    educationOptions.includes(user.education) &&
    raceOptions.includes(user.race)).toBe(true)
})