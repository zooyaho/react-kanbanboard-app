import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoard {
  toDos:string[];
  boardId: string;
}

const Board = ({toDos, boardId}:IBoard) => {
  return (
    <Droppable droppableId={boardId}>
      {(provied) => (
        <Wrapper ref={provied.innerRef} {...provied.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index} />
          ))}
          {provied.placeholder}
          {/* placeholder : droppable이 끝날때 두는 무언가를 가리킴 -> 사이즈가 이상하게 변하는 것을 방지함. */}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Board;