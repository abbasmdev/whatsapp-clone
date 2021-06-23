import { Avatar, IconButton } from "@material-ui/core";
import styled from "styled-components";
import {
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import styles from "./index.module.css";

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <SidebarAvatar />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchContainer>
        <SidebarSearch>
          <SearchIcon />
          <SearchInput placeholder="Search in chats" />
        </SidebarSearch>
      </SearchContainer>
      <StartNewChatButton>START A NEW CHAT</StartNewChatButton>
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
