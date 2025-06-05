import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 100%;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MenuItem = styled.a`
  color: var(--color-white);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const openGmailCompose = (email: string, subject = "", body = "") => {
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.open(url, "_blank");
};

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>LOG VALIDATION TOOL</Logo>
      <Menu>
        <MenuItem
          href="https://ondc-official.github.io/ONDC-RET-Specifications/"
          target="_blank"
        >
          Developer Docs
        </MenuItem>
        <MenuItem href="https://github.com/ONDC-Official" target="_blank">
          GitHub
        </MenuItem>
        <MenuItem
          onClick={() =>
            openGmailCompose("techsupport@ondc.org", "Support Request", "")
          }
        >
          Support
        </MenuItem>
        <MenuItem href="https://buddy.ondc.org/">Need Help?</MenuItem>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
