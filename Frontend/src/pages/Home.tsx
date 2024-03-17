import Logout from "../components/Logout";
import { TodoWrapper } from "../components/TodoWrapper";

export default function Home() {
  return (
    <>
      <div className="app">
        <TodoWrapper />
      </div>
      <Logout />
    </>
  );
}
