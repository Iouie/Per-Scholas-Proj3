import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

function NavBar(props) {
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }
  return (
    <nav className="text-center text-2xl ">
      <span>Hey {props.user.name}</span> &nbsp; | &nbsp;
      <Link to="/dashboard"> Dashboard</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}

export default NavBar;
