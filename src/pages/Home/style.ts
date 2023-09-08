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

export const InputBase = styled.input`
  background: transparent;
  height: 4rem;
  padding: 0 0.8rem;
  border-bottom: 2px solid ${({ theme }) => theme["gray-500"]};
  font-size: 1.8rem;
  color: ${({ theme }) => theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme["green-500"]};
  }

  &::placeholder {
    color: ${({ theme }) => theme["gray-500"]};
  }
`;

export const InputTask = styled(InputBase)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const InputMinutesAmount = styled(InputBase)`
  width: 6.4rem;
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
    background: ${({ theme }) => theme["green-700"]};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    filter: brightness(1.1);
  }
`;
