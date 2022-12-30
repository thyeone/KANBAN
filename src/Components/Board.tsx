import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import CloseIcon from "@mui/icons-material/Close";

export interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  idx: number;
}

export interface IToDoForm {
  toDo: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}

function Board({ toDos, boardId, idx }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const setBoards = useSetRecoilState(boardState);
  const { register, setValue, handleSubmit } = useForm<IToDoForm>();
  const onValid = ({ toDo }: IToDoForm) => {
    const newToDo = { id: Date.now(), text: toDo };
    setToDos((allBoards) => {
      // 기존 allBoards와 등록하려는 현재 보드(boardId)에 newToDo를 추가
      return { ...allBoards, [boardId]: [newToDo, ...allBoards[boardId]] };
    });
    setValue("toDo", "");
  };
  const DeleteBoard = () => {
    setBoards((prev) => {
      const allBoards = [...prev];
      allBoards.splice(idx, 1);
      return allBoards;
    });
  };
  return (
    <Draggable draggableId={boardId} index={idx} key={boardId}>
      {(magic) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <Title>
            {boardId}
            <span />
            <button className="board-delete" onClick={DeleteBoard}>
              <CloseIcon />
            </button>
          </Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, idx) => (
                  <DraggableCard
                    key={toDo.id}
                    index={idx}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.isDraggingOver
      : props.isDraggingFromThisWith
      ? props.theme.isDraggingFromThisWith
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin: 10px 0;
  font-size: 18px;
  line-height: 27px;

  .board-delete {
    position: absolute;
    margin-left: 80px;
    opacity: 0;
    color: ${(props) => props.theme.textColor};
    transition: opacity 0.2s;
    border: 0;
    background-color: transparent;
  }
  &:hover .board-delete {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    height: 34px;
    border: none;
    background-color: ${(props) => props.theme.cardColor};
    padding: 0px 8px;
    color: #fff;
    ::placeholder {
      color: #fff;
    }
  }
`;

export default React.memo(Board);
