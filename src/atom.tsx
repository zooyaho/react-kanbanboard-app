import { atom } from 'recoil';

export interface IToDo {
  id: number;
  text: string;
}

// typescript는 default에 작성한 것만 허용하기 때문에 toDoState의 interface생성 
interface IToDoState {
  [key:string] : IToDo[];
}
/* IToDoState 데이터 형식
{
  "To Do": [ {id: "1", text:"study"}, {id: "2", text:"running"}, ... ],
  Doing: [ {id: "1", text:"sleep"}, {id: "2", text:"mounting"}, ... ],
}
*/
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do":[],
    Doing:[],
    Done: []
  }
})