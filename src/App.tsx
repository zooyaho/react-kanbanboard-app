import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import { toDoState } from './atom';
import Board from './components/Board';

// Reset CSS
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Roboto Mono', monospace;
  background-color: ${(props) => props.theme.bgColor};
  color:black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color: inherit;
}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  /* 드래그가 끝났을때 실행되는 함수 */
  const dragEndHandler = (info: DropResult) => {
    const { draggableId, destination, source } = info;
    // draggableId는 우리가 움직인 card의 id -> 1부터 시작하는 string타입임.

    // destination이 없을 경우 > 제자리에 드롭한 경우
    if (!destination) return;

    // 1. source보드와 destination보드가 같을 경우
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; // 드래그한 보드 복사
        const taskObj = boardCopy[source.index]; // 해당 obj의 참조값을 얻은 후 사용
        boardCopy.splice(source.index, 1); // 드래그한 요소 삭제
        boardCopy.splice(destination?.index, 0, taskObj) // 드롭한 지점에 요소 추가

        // 바뀐 보드만 수정되어서 넣음.
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });
    }

    // 2. source보드가 destination보드와 다를 경우
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        // source, destination 보드 복사
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        // source, destination 보드에 각각 요소를 삭제, 추가
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination?.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination?.droppableId]: destinationBoardCopy
        };
      });
    }
  }

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={dragEndHandler}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
