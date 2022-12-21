import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <BoardWrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, idx) => (
            <DraggableCard key={toDo} toDo={toDo} index={idx} />
          ))}
          {magic.placeholder}
        </BoardWrapper>
      )}
    </Droppable>
  );
}

const BoardWrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
export default Board;
