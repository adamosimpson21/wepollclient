export const MAX_LEVEL = 14
export const MAX_EXPERIENCE = 45000;

// holds minimum experience to be a level
export const experienceObj = {
  '1':0,
  '2':100,
  '3':500,
  '4':1000,
  '5':1500,
  '6':2000,
  '7':2500,
  '8':3500,
  '9':5000,
  '10':7500,
  '11':10000,
  '12':15000,
  '13':25000,
  //Max Level
  '14':MAX_EXPERIENCE
}

//checks the User's level based on experience
export function checkLevel(experience){
  for(let i=1; i<=MAX_LEVEL; ++i){
    if(experience<=experienceObj[i+1]){
      return i;
    }
  }
  return 0;
}

//returns the User's percent progress to the next level (0-100)
export function levelProgress(experience){
  const currentLevel = checkLevel(experience)
  if(currentLevel === MAX_LEVEL){
    return 100;
  } else {
    const thisLevelXp = experienceObj[currentLevel]
    const nextLevelXp = experienceObj[currentLevel+1]
    const progressThisLevel = experience - thisLevelXp
    const xpThisLevel = nextLevelXp - thisLevelXp
    return ((progressThisLevel/xpThisLevel)*100)
  }
}