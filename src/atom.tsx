import { atom } from 'recoil';

// typescript는 default에 작성한 것만 허용하기 때문에 toDoState의 interface생성 // 추후에 사용자가 board를 추가하는 기능 작업 예정
interface IToDoState {
  [key:string] : string[]
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b", "e"],
    Doing: ["c", "d"],
    Done: [ "f"]
  }
})