import styled from "styled-components";

export const HistoryContainer = styled.div`
  flex: 1;
  padding: 5.6rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme["gray-100"]};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 3.2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  tr:hover {
    filter: brightness(1.1);
  }

  th {
    background: ${({ theme }) => theme["gray-600"]};
    color: ${({ theme }) => theme["gray-100"]};
    padding: 1.6rem;
    text-align: left;
    font-size: 1.4rem;
    line-height: 1.6;

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 2.4rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 2.4rem;
    }
  }

  td {
    background: ${({ theme }) => theme["gray-700"]};
    border-top: 4px solid ${({ theme }) => theme["gray-800"]};
    padding: 1.6rem;
    font-size: 1.4rem;
    line-height: 1.6;

    &:first-child {
      padding-left: 2.4rem;
      width: 50%;
    }

    &:last-child {
      padding-right: 2.4rem;
    }
  }
`;
