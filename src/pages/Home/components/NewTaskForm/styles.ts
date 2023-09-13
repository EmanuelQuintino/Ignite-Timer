import styled from "styled-components";

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
