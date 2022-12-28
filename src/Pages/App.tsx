import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, deleteState, toDoState } from "../atoms";
import Board from "../Components/Board";
import CreateBoard from "../Components/CreateBoard";
import TrashCan from "../Components/TrashCan";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(boardState);
  const trashCan = useSetRecoilState(deleteState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    trashCan(true);
    if (source.droppableId === "boards") {
      setBoards((prev) => {
        const boardCopy = [...prev];
        const item = boardCopy[source.index];
        boardCopy.splice(source.index, 1); // 지우고
        boardCopy.splice(destination.index, 0, item); // 도착지의 인덱스에 item을 추가
        return boardCopy;
      });
    }
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CreateBoard setToDos={setToDos} setBoards={setBoards} />
      <Wrapper>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {boards.map((boardId, idx) => (
                <Board
                  key={idx}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                  idx={idx}
                />
              ))}
            </Boards>
          )}
        </Droppable>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

export default App;
