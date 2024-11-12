// Header.jsx
import { useEffect } from "react";
import styled from "styled-components";
import { auth, provider, } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
} from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [userName, navigate]);

  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Authentication Error:", error.message);
      alert("Error signing in: " + error.message);
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="./images/MOVIEBILLBOARD.png" alt="logo" />
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <NavItem to="/home" icon="home-icon.svg" label="HOME" />
            <NavItem to="#" icon="movie-icon.svg" label="MOVIES" />
            <NavItem to="#" icon="watchlist-icon.svg" label="WATCHLIST" />
            <NavItem to="#" icon="original-icon.svg" label="FAVORITES" />
            <NavItem to="#" icon="series-icon.svg" label="SERIES" />
            <NavItem to="#" icon="search-icon.svg" label="SEARCH" />
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

// Helper component for navigation items
const NavItem = ({ to, icon, label }) => (
  <Link to={to}>
    <img src={`/images/${icon}`} alt={label} />
    <span>{label}</span>
  </Link>
);

// Styled components
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      width: 20px;
    }

    span {
      color: #f9f9f9;
      font-size: 13px;
      letter-spacing: 1.42px;
      padding: 2px 0;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        height: 2px;
        background-color: #f9f9f9;
        border-radius: 4px;
        bottom: -6px;
        left: 0;
        right: 0;
        opacity: 0;
        transform: scaleX(0);
        transition: all 0.25s ease;
      }
    }

    &:hover span:before {
      transform: scaleX(1);
      opacity: 1;
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: #131313;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
  padding: 10px;
  font-size: 14px;
  width: 100px;
  opacity: 0;
  transition: opacity 0.5s;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;

  &:hover ${DropDown} {
    opacity: 1;
  }
`;

export default Header;
