import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
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

const Area = styled.div`
  background-color: pink;
  // Area만 grow를 지정해서 남은 여백을 모두 차지하게 함.
  flex-grow: 1;
`;

interface IBoard {
  toDos:string[];
  boardId: string;
}

const Board = ({toDos, boardId}:IBoard) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <Area ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
            {/* placeholder : droppable이 끝날때 두는 무언가를 가리킴 -> 사이즈가 이상하게 변하는 것을 방지함. */}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;