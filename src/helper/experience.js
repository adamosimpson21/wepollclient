export const MAX_LEVEL = 45

//returns amount of total experience to reach a level
export function xpToLevel(level){
  if(level<=1){
    return 0;
  } else if (level<=2){
    return 100;
  } else if (level<=3){
    return 500;
  } else if (level<=4){
    return 1000;
  } else if (level<=5){
    return 1500;
  } else if (level<=6){
    return 2000;
  } else if (level<=7){
    return 2500;
  } else if (level<=8){
    return 3500;
  } else if (level<=9){
    return 5000;
  } else if (level<=10){
    return 7500;
  } else if (level<=11){
    return 10000;
  } else if (level<=12){
    return 15000;
  } else if (level<=13){
    return 25000;
  } else {
    return 40000;
  }
}

//checks the User's level based on experience
export function checkLevel(experience){
  for (let i=1; i<MAX_LEVEL; i++){
    //checks user's XP vs next level
    if(experience<xpToLevel(i)){
      //returns level -1
      return i-1;
    }
  }
  return 0
}

//returns the User's percent progress to the next level
export function levelProgress(experience){
  const xpThisLevel = xpToLevel(checkLevel(experience))
  //progress this level
  const progress = (experience-xpThisLevel)
  //experience for next level
  const nextLevel = (xpToLevel(checkLevel(experience) + 1)-(xpThisLevel))
  //divide progress/next and return percentage
  return ((progress/nextLevel)*100)
}