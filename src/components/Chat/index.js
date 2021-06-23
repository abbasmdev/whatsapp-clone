import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { firebaseAuth, firebaseDb } from "../../firebase/firebase";
import { selectSelectedChatId } from "../../store/chat/chatSlice";
import { Avatar, IconButton } from "@material-ui/core";
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotionsOutlined as EmojiEmotionsOutlinedIcon,
  Send as SendIcon,
} from "@material-ui/icons";

const Chat = () => {
  const [currentUser] = useAuthState(firebaseAuth);
  const selectedChatId = useSelector(selectSelectedChatId);
  const [chatSnapshot] = useDocument(firebaseDb.doc(`chats/${selectedChatId}`));
  const messagesRef = firebaseDb
    .collection("chats")
    .doc(selectedChatId)
    .collection("messages")
    .orderBy("timestamp", "asc");

  const [messagesSnapshot] = useCollection(messagesRef);
  const chatData = chatSnapshot?.data();
  const recipientEmail = chatData?.users.find((u) => u !== currentUser?.email);

  console.log(recipientEmail);

  return (
    <Container>
      <Header>
        <Avatar />
        <UserInfo>
          <h3>{recipientEmail}</h3>
        </UserInfo>
        <ActionsList>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </ActionsList>
      </Header>
      <Body>
        <MessagesList>
          <EndOfMessagesList />
        </MessagesList>
        <BottomContainer>
          <LeftActionsList>
            <IconButton>
              <EmojiEmotionsOutlinedIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
          </LeftActionsList>
          <MessageInputContainer>
            <MessageInput placeholder="Type a message" />
          </MessageInputContainer>

          <RightActionsList>
            <IconButton>
              <SendIcon />
            </IconButton>
          </RightActionsList>
        </BottomContainer>
      </Body>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #ededed;
  border-left: 2px solid whitesmoke;
  padding: 10px 5px;
  max-height: 80px;
  height: 100%;
  align-items: center;
`;
const UserInfo = styled.div`
  flex: 1;
  margin: 0 5px;
`;
const ActionsList = styled.div``;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const MessagesList = styled.div`
  flex: 1;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const EndOfMessagesList = styled.div``;

const BottomContainer = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #ededed;
  border-left: 2px solid whitesmoke;
  display: flex;
  align-items: center;
`;
const LeftActionsList = styled.div``;
const RightActionsList = styled.div``;
const MessageInputContainer = styled.div`
  flex: 1;
  border-radius: 15px;
  background-color: white;
  padding: 10px 10px;
`;

const MessageInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
`;
