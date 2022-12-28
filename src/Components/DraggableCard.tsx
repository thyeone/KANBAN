import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, index, toDoText }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? props.theme.isDragging : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 5px rgba(0,0,0,0.5)" : "none"};
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
`;

export default React.memo(DraggableCard);
