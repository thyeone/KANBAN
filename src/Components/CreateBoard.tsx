import { useForm } from "react-hook-form";
import { SetterOrUpdater } from "recoil";
import styled from "styled-components";
import { IToDoState } from "../atoms";

interface IBoardForm {
  newBoard: string;
}

interface ICreateBoard {
  setToDos: SetterOrUpdater<IToDoState>;
  setBoards: SetterOrUpdater<string[]>;
}

const CreateBoard = ({ setToDos, setBoards }: ICreateBoard) => {
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();

  const onSubmit = ({ newBoard }: IBoardForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [newBoard]: [] };
    });
    setBoards((allBoards) => {
      return [...allBoards, newBoard];
    });
    setValue("newBoard", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("newBoard", { required: true })}
        type="text"
        placeholder="Create a new board"
      ></input>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  input {
    width: 50%;
    height: 34px;
    border: none;
    background-color: ${(props) => props.theme.cardColor};
    padding: 0px 8px;
    border-radius: 5px;
    color: #fff;
    ::placeholder {
      color: #fff;
    }
  }
`;

export default CreateBoard;
