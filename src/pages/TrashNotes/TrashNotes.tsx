import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Container, EmptyMsgBox } from '../../styles/styles';
import MainWrapper from '../../components/MainWrapper/MainWrapper';

const TrashNotes = () => {

  const {trashNotes} = useAppSelector((state) => state.noteListSlice);

  return (
    <Container>
      {trashNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <MainWrapper notes={trashNotes} type = "trash" />
      ) }
    </Container>
  )
}

export default TrashNotes