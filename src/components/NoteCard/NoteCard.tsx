import React from 'react'
import { Card, ContentBox, FooterBox, TagsBox, TopBox } from './NoteCard.styles';
import { NotesIconBox } from '../../styles/styles';
import {BsFillPinFill} from 'react-icons/bs';
import { Note } from '../../types/note';
import { useAppDispatch } from '../../hooks/redux';
import getRelevantBtns from '../../utils/getRelevantBtns';
import { readNote, setPinnedNote } from '../../store/noteList/noteListSlice';
import parse from 'html-react-parser';
import { ReadNoteModal } from '..';

interface NoteCardProps {
  note: Note,
  type: string
}

const NoteCard = ({note, type}:NoteCardProps) => {

  const dispatch = useAppDispatch();

  const {title, content, tags, color, priority, date, isPinned, isRead, id} = note;

  const func = () => {
    const imageContent = content.includes("img")
    //이미지가 있을 때는 이름을 자르면 이미지 보이지 않기 때문에 그냥 return 
    if(imageContent){
      return content;
    }else{
      return content.length > 75 ? content.slice(0,75) + "..." : content;
    }
  }

  return (
    <>
    {isRead && <ReadNoteModal type={type} note={note} />}
    <Card style={{background: color}}>
      <TopBox>
        <div className='noteCard__title'>
          {title.length > 10 ? title.slice(0,10) + "..." : title}
        </div>
        <div className='noteCard__top-options'>
          <span className='noteCard__priority'>
            {priority}
          </span>
          {type !== "archive" && type !== "trash" && (
            <NotesIconBox className='noteCard__pin'
              onClick={() => dispatch(setPinnedNote({id}))}
            >
              <BsFillPinFill
                style={{color: isPinned === true ? "red" : ""}}
              />
            </NotesIconBox>
          )}
        </div>
      </TopBox>
      <ContentBox onClick={() => dispatch(readNote({type, id}))}>
        {parse(func())}
      </ContentBox>
      <TagsBox>
        {tags.map(({tag, id}) => (
          <span key={id}>{tag}</span>
        ))}
      </TagsBox>
      <FooterBox>
        <div className='noteCard__date'>{date}</div>
        <div>{getRelevantBtns(type, note, dispatch)}</div>
      </FooterBox>
    </Card>
    </>
  )
}

export default NoteCard