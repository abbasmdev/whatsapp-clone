import styled from "styled-components";

const Blank = () => {
  return (
    <Container>
      <Message>Select a chat to start messaging.</Message>
    </Container>
  );
};

export default Blank;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  background-color: white;
  padding: 4px 6px;
  border-radius: 15px;
`;
