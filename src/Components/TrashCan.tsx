import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import trashcan from "../assets/trashcan.svg";

const TrashCan = () => {
  return (
    <Droppable droppableId="trashcan">
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          <TrashCanImg />
        </Wrapper>
      )}
    </Droppable>
  );
};

const Wrapper = styled.div`
  width: 300px;
  max-height: 50px;
  background-color: #dadfe9;
  border-radius: 8px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0.5px 0.5px 0px 0.5px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.147);
    transition: all 0.5s ease;
  }
`;

const TrashCanImg = styled.img.attrs({
  src: `${trashcan}`,
})``;

export default TrashCan;
