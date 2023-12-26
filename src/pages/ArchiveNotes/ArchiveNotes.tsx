import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import { Container, EmptyMsgBox } from '../../styles/styles';
import MainWrapper from '../../components/MainWrapper/MainWrapper';

const ArchiveNotes = () => {

  const {archiveNotes} = useAppSelector((state) => state.noteListSlice);

  return (
    <Container>
      {archiveNotes.length === 0 ? (
        <EmptyMsgBox>노트가 없습니다.</EmptyMsgBox>
      ) : (
        <MainWrapper notes={archiveNotes} type="archive" />
      )
      }
    </Container>
  )
}

export default ArchiveNotes