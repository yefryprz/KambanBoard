import styled from "@emotion/styled";

const Board = styled.div``;

const BoardTitle = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
`;

const Card = styled.div`
  box-shadow: 1px 1px 6px 2px lightgray;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  margin: 5px 0px;

  .title {
    text-align: start;
    color: gray;
    margin: 0px;
  }

  .description {
    text-align: justify;
  }

  .center {
    text-align: center;
  }
`;

const CardTitle = styled.div`
  border-radius: 5px;
  margin: 5px 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  background-color: ${(props) => props.color || "whitesmoke"};
  margin: 0px 5px;
  border-radius: 5px;
  padding: ${(props) => props.padding || "15px"};

  h5 {
    text-align: center;
    margin: 7px 0px;
  }
`;

export { Board, BoardTitle, Row, Column, Card, CardTitle };
