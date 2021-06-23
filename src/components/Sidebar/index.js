import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import {
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { firebaseAuth, firebaseDb } from "../../firebase/firebase";
import styles from "./index.module.css";
import ChatItem from "./ChatItem";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUser = firebaseAuth.currentUser;
  const userChatsRef = firebaseDb
    .collection("chats")
    .where("users", "array-contains", currentUser.email);

  const [userChatsSnapshot] = useCollection(userChatsRef);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const startANewChatClickHandler = async () => {
    const email = prompt("Enter email of the user you want to chat with");
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    )
      return;
    if (email === currentUser.email || isChatExists(email)) {
      alert("Chat already exists.");
      return;
    }
    firebaseDb.collection("chats").add({ users: [currentUser.email, email] });
  };

  const logoutClickHandler = () => {
    firebaseAuth.signOut();
  };
  const isChatExists = (recipientEmail) => {
    const found = userChatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((userEmail) => recipientEmail === userEmail)
    );
    console.log("found != null>>", found != null);
    return found != null;
  };
  return (
    <Container>
      <Header>
        <SidebarAvatar />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled={true} onClick={handleClose}>
                New group
              </MenuItem>
              <MenuItem disabled={true} onClick={handleClose}>
                Create a room
              </MenuItem>
              <MenuItem disabled={true} onClick={handleClose}>
                Profile
              </MenuItem>
              <MenuItem disabled={true} onClick={handleClose}>
                Archived
              </MenuItem>
              <MenuItem disabled={true} onClick={handleClose}>
                Starred
              </MenuItem>
              <MenuItem disabled={true} onClick={handleClose}>
                Settings
              </MenuItem>
              <MenuItem onClick={logoutClickHandler}>Log out</MenuItem>
            </Menu>
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchContainer>
        <SidebarSearch>
          <SearchIcon />
          <SearchInput placeholder="Search in chats" />
        </SidebarSearch>
      </SearchContainer>
      <StartNewChatButton onClick={startANewChatClickHandler}>
        START A NEW CHAT
      </StartNewChatButton>

      <ChatsListContainer>
        {userChatsSnapshot?.docs?.map((chat) => (
          <ChatItem
            id={chat.id}
            key={chat.id}
            userEmail={
              chat.data().users.filter((e) => e !== currentUser.email)[0]
            }
          />
        ))}
      </ChatsListContainer>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #ededed;
  z-index: 100;
  justify-content: space-between;
  padding: 10px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.88;
  }
`;

const ChatsListContainer = styled.div``;
const IconsContainer = styled.div``;
const SearchContainer = styled.div`
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  padding: 15px;
`;
const SidebarSearch = styled.div`
  flex: 1;
  display: flex;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ededed;
  > .MuiSvgIcon-root {
    color: gray !important;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const StartNewChatButton = styled.button`
  width: 100%;
  border: none;
  padding: 10px 0px;
  cursor: pointer;
  :hover,
  :active {
    background-color: #e0e0e0;
  }
`;
