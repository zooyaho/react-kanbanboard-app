import { atom, selector } from 'recoil';

// interface IMinutes {
//   minutes: number;
// }

export const minutesState = atom({ 
  key: "minutes", 
  default: 0
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({get})=>{
    const minutes = get(minutesState);
    console.log(minutes);
    return minutes / 60;
  },
  set: ({set}, newMinutes)=>{
    // 인수의 값을 newMinutes으로 가져옴.
    console.log(typeof newMinutes);
    const minutes = Number(newMinutes) * 60;
    set(minutesState, minutes);
  }
});