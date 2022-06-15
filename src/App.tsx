import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';
import { toDoState } from './atom';
import DraggableCard from './components/DraggableCard';

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
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // ["a", "b", "c", "d", "e", "f"]

  /* 드래그가 끝났을때 실행되는 함수 */
  const dragEndHandler = ({draggableId, destination, source}:DropResult) => {
    // destination이 없을 경우 > 제자리에 드롭한 경우
    if(!destination) return;

    setToDos((curToDo)=>{
      const copyToDos = [...curToDo];
      copyToDos.splice(source.index,1); // 드롭한 요소 삭제
      copyToDos.splice(destination?.index,0,draggableId) // 드롭한 지점에 요소 추가
      return copyToDos;
    });
  }

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={dragEndHandler}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provied) => (
                <Board ref={provied.innerRef} {...provied.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo} toDo={toDo} index={index} />
                  ))}
                  {provied.placeholder}
                  {/* placeholder : droppable이 끝날때 두는 무언가를 가리킴 -> 사이즈가 이상하게 변하는 것을 방지함. */}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
