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

  form > section {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  padding: 1.6rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme["gray-100"]};

  &:disabled {
    background: ${({ theme }) => theme["green-700"]};
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["green-500"]};
  transition: background 100ms;

  &:not(:disabled):hover {
    filter: brightness(1.1);
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["red-500"]};
  transition: background 100ms;

  &:not(:disabled):hover {
    filter: brightness(1.1);
  }
`;
