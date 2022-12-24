import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 5px rgba(0,0,0,0.5)" : "none"};
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
`;

export default React.memo(DraggableCard);
