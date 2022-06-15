import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
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
      {(provied) => (
        <Card ref={provied.innerRef} {...provied.dragHandleProps} {...provied.draggableProps} >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);