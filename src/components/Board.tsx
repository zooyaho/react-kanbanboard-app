import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";


// 배경색 변화로 사용자가 보드에 도착하는지 떠나가는지 보여줌
const Wrapper = styled.div`
  width: 300px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  // 유저가 위로 드래그해서 들어오고 있는지에 따른 배경색 변경
  // 드래그해서 떠나면 red 기본 배경 transparent
  background-color: ${(props) => 
    props.isDraggingOver
    ? "#dfe6e9"
    : props.isDraggingFromThis
    ? "#b2bec3"
    : "transparent"};
  // Area만 grow를 지정해서 남은 여백을 모두 차지하게 함.
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    font-size: 16px;
    width: 100%;
  }
  span {
    font-size: 12px;
    font-weight: bold;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

// 인자 형식 toDos: "To Do"보드에 해당하는 데이터, boardId: "To Do"
const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const {register, handleSubmit, setValue,formState: { errors }} = useForm<IForm>();

  const handleValid = ({toDo}: IForm)=>{
    const newObj = {
      id: Date.now(),
      text: toDo
    }
    setToDos((allBoards)=>{
      return { 
        ...allBoards, 
        [boardId]:[...allBoards[boardId], newObj]
      }
    });
    setValue("toDo","")
  }

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(handleValid)}>
        <input 
          {...register("toDo", { required:true, minLength: {value:5, message:"short!!"}})} 
          placeholder={`Add task on ${boardId}`} />
        <span style={{color:"#c44569"}}>{errors?.toDo?.message}</span>
        {/* <button>click me</button> */}
      </Form>
      <Droppable droppableId={boardId}>
        {(provied, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provied.innerRef}
            {...provied.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provied.placeholder}
            {/* placeholder : droppable이 끝날때 두는 무언가를 가리킴 -> 사이즈가 이상하게 변하는 것을 방지함. */}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;