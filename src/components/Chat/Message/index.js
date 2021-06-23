import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { firebaseAuth } from "../../../firebase/firebase";

const Message = ({ user, data }) => {
  const [currentUser] = useAuthState(firebaseAuth);
  const MessageItemRS =
    currentUser?.email === user ? SenderMessageItem : ReceiverMessageItem;
  return (
    <Container>
      <MessageItemRS>{data.message}</MessageItemRS>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  margin: 10px;
`;

const MessageItem = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 10px;
  max-width: 150px;
  width: 100%;
  word-break: break-all;
`;

const SenderMessageItem = styled(MessageItem)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const ReceiverMessageItem = styled(MessageItem)`
  text-align: left;
  background-color: white;
`;
