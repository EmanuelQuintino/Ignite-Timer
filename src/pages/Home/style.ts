import styled from "styled-components";

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5.6rem;
  }
`;
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme["gray-100"]};
  font-size: 1.8rem;
  flex-wrap: wrap;
`;

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

export const StartCountdownButton = styled.button`
  width: 100%;
  padding: 1.6rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme["gray-100"]};
  background: ${({ theme }) => theme["green-500"]};
  transition: background 100ms;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme["green-700"]};
  }
`;
