import { Avatar } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { firebaseDb } from "../../../firebase/firebase";

const ChatItem = ({ userEmail, id, onClick }) => {
  const [recipientUserSnapshot] = useCollection(
    firebaseDb.collection("users").where("email", "==", userEmail)
  );
  const recipientUser = recipientUserSnapshot?.docs?.[0]?.data();
  return (
    <Container onClick={onClick}>
      {recipientUser?.photoURL ? (
        <CustomAvatar src={recipientUser?.photoURL} />
      ) : (
        <CustomAvatar>{userEmail[0]}</CustomAvatar>
      )}

      <p>{userEmail}</p>
    </Container>
  );
};

export default ChatItem;

const Container = styled.div`
  display: flex;
  margin-bottom: 1px;
  border-bottom: 1px solid whitesmoke;
  border-top: 1px solid whitesmoke;
  background-color: white;
  align-items: center;
  padding: 10px 5px;
  word-break: break-all;
  gap: 10px;
  cursor: pointer;
  :hover {
    background-color: #e9eaeb;
  }
`;
const CustomAvatar = styled(Avatar)``;
