import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.8rem;

    a {
      width: 4.8rem;
      height: 4.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme["gray-100"]};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme["green-500"]};
      }

      &.active {
        color: ${({ theme }) => theme["green-500"]};
      }
    }
  }
`;
