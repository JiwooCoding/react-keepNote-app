import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useParams } from 'react-router-dom';
import { Note } from '../../types/note';
import { Container, EmptyMsgBox } from '../../styles/styles';
import MainWrapper from '../../components/MainWrapper/MainWrapper';

const TageNotes = () => {

  const {name} = useParams() as {name: string};
  const {mainNotes} = useAppSelector((state) => state.noteListSlice);
  
  let notes: Note[] = [];
  //foreach VS map
  //map은 새로운 배열을 반환하기 때문에 불필요하게 반환된 배열이 생성되어 메모리를 차지하기 때문에
  //map: 새로운 배열을 만들거나 데이터를 변경할 때 주로 사용
  //foreach: 데이터 필터링하고 추가하는 경우에 적합
  mainNotes.forEach((note) => {
    if(note.tags.find(({tag}) => tag === name)){
      notes.push(note);
    }
  })

  return (
    <Container>
      {notes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <MainWrapper notes={notes} type={name} />
      )}
    </Container>
  )
}

export default TageNotes