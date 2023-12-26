import React from 'react'
import { Note } from '../../../types/note'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box } from './ReadNoteModal.styles';
import { readNote } from '../../../store/noteList/noteListSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { FaTimes } from 'react-icons/fa';
import parse from 'html-react-parser';

interface ReadNoteModalProps {
  note:Note;
  type: string
}

const ReadNoteModal = ({note, type}:ReadNoteModalProps) => {

  const dispatch = useAppDispatch();

  return (
    <FixedContainer>
      <Box style={{backgroundColor: note.color}}>
        <DeleteBox
          onClick={() => dispatch(readNote({type, id:note.id}))}
          className='readNote__close-btn'
        >
          <FaTimes/>
        </DeleteBox>
        <div className='readNote__title'>{parse(note.title)}</div>
        <div className='readNote__content'>{parse(note.content)}</div>
      </Box>
    </FixedContainer>
  )
}

export default ReadNoteModal