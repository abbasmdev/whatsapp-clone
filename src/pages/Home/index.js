import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import styles from "./index.module.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSelectedChatId } from "../../store/chat/chatSlice";
import Blank from "../../components/Blank";
const Home = () => {
  const selectedChatId = useSelector(selectSelectedChatId);
  return (
    <Container>
      <Sidebar />
      {selectedChatId ? <Chat /> : <Blank />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export default Home;
