import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICard {
  isDragging: boolean;
}

const Card = styled.div<ICard>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  // dragging중일 때의 배경색은 진한핑크색
  background-color: ${(props) => props.isDragging ? "#f8a5c2" : props.theme.cardColor};
  box-shadow: ${props=> props.isDragging ? "0px 2px 5px rgba(0,0,0,0.3)": "none"}
`;

interface IDraggableCardProps {
  toDo: string,
  index: number
}

const DraggableCard = ({toDo, index}:IDraggableCardProps) => {
  console.log(toDo, "재 렌더링");
  return (
    // 이 라이브러리에서 key와 draggableId의 값이 무조건 같아야 함.
    <Draggable draggableId={toDo} index={index}>
      {(provied, snapshot) => (
        <Card 
          isDragging={snapshot.isDragging}
          ref={provied.innerRef} 
          {...provied.dragHandleProps} 
          {...provied.draggableProps} 
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);