import styled from "styled-components";

export const CountdownContainer = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 16rem;
  line-height: 12.8rem;
  color: ${({ theme }) => theme["gray-100"]};
  display: flex;
  gap: 1.6rem;

  span {
    background: ${({ theme }) => theme["gray-700"]};
    padding: 3.2rem 1.6rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  color: ${({ theme }) => theme["green-500"]};
  width: 6.4rem;
  padding: 3.2rem 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
