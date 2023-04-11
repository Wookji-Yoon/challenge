import styled from "styled-components";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";

const Nav = styled(motion.div)`
  color: ${(props) => props.theme.white.lighter};
  font-size: 15px;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0px 40px;
  box-sizing: border-box;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-right: 20px;
  position: relative;
`;
const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 50px;
  height: 50px;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
  bottom: 17px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const logoVariants = {
  initial: {
    pathLength: 1,
    strokeWidth: 6,
    stroke: "#E51013",
    fill: "#E51013",
    d: "M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z",
  },
  hover: {
    pathLength: [0, 1],
    fill: ["#181818", "#E51013"],
    transition: {
      default: { duration: 5 },
      fill: { duration: 2, delay: 1 },
    },
  },
};

function Header() {
  const [onSearch, setOnSearch] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setIsDown(true);
    } else {
      setIsDown(false);
    }
  });

  const tv = useMatch("/tv");
  const home = useMatch("/");

  return (
    <Nav animate={{ backgroundColor: isDown ? "rgba(24, 24, 24, 1)" : "rgba(24, 24, 24, 0)" }}>
      <Col>
        <Logo xmlns="http://www.w3.org/2000/Logo" viewBox="0 0 1024 276.742">
          <motion.path variants={logoVariants} initial="initial" whileHover="hover" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home
              {home && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              TV Show
              {tv && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <motion.span
          style={{ fontSize: "20px" }}
          animate={{ x: onSearch ? 0 : 200 }}
          transition={{ type: "linear" }}
          onClick={() => {
            setOnSearch((prev) => !prev);
          }}
        >
          🔎
        </motion.span>
        <motion.input
          style={{ fontSize: "16px", padding: 2 }}
          animate={{ scaleX: onSearch ? 1 : 0, transformOrigin: "right center" }}
          transition={{ type: "linear" }}
          placeholder="Search the show..."
        />
      </Col>
    </Nav>
  );
}

export default Header;
