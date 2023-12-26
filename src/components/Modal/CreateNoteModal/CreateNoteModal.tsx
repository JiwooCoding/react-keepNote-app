import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { AddedTagsBox, Box, OptionsBox, StyledInput, TopBox } from './CreateNoteModal.styles';
import { toggleCreateNoteModal, toggleTagsModal } from '../../../store/modal/modalSlice';
import { setEditNote, setMainNote } from '../../../store/noteList/noteListSlice';
import { ButtonFill, ButtonOutline } from '../../../styles/styles';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { TagsModal, TextEditor } from '../..';
import { v4 } from 'uuid';
import {toast} from 'react-toastify'
import dayjs from 'dayjs';
import { Note } from '../../../types/note';

const CreateNoteModal = () => {

  const closeCreateNoteModal = () => {
    dispatch(toggleCreateNoteModal(false))
    dispatch(setEditNote(null)) //무슨 기능인지 모르겠음
  }

  const dispatch = useAppDispatch();
  const {editNote} = useAppSelector((state) => state.noteListSlice);
  const {viewAddTagsModal} = useAppSelector((state) => state.modalSlice);

  const [noteTitle, setNoteTitle] = useState(editNote?.title || "");
  const [value, setValue] = useState(editNote?.content || "");
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || "");
  const [priority, setPriority] = useState(editNote?.priority || "low");

  const tagsHandler = (tag: string, type: string) => {
    //type: add 또는 remove (tag를 더하거나 빼는 기능 위해)
    const newTag = tag.toLowerCase(); 

    if(type === 'add') {
      setAddedTags((prev) => [...prev, {tag: newTag, id:v4()}])
    }else{
      setAddedTags(addedTags.filter(({tag}) => tag !== newTag))
    }
  }

  const createNoteHandler = () => {
    if(!noteTitle){
      toast.error('타이틀을 적어주세요');
      return;
    }else if(value === "<p><br></p>"){
      toast.error('글을 작성해주세요');
      return;
    }

    const date = dayjs().format("DD/MM/YY h:mm A");

    let note: Partial<Note> = {
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
  }
  // 편집 중이라면
  if(editNote){
    note = {...editNote, ...note}
  //새로 노트 생성한다면
  }else{
    note={
      ...note,
      date,
      createdTime: new Date().getTime(),
      editedTime: null,
      isPinned: false,
      isRead: false,
      id: v4()
    }
  }

  dispatch(setMainNote(note));
  dispatch(toggleCreateNoteModal(false));
  dispatch(setEditNote(null));

}

  return (
    <FixedContainer>
      {/* Tags Modal */}
      {viewAddTagsModal &&
        <TagsModal type='add' addedTags={addedTags} handleTags={tagsHandler}/>
      }
      <Box>
        <TopBox>
          <div className='createNote_title'>노트 생성하기</div>
          <DeleteBox
            className='createNote__close-btn'
            onClick={closeCreateNoteModal}
          >
            <FaTimes/>
          </DeleteBox>
        </TopBox>
        <StyledInput
          type='text'
          value={noteTitle}
          name='title'
          placeholder='제목'
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        {/* react-quill */}
        <div>
          <TextEditor color={noteColor} value={value} setValue={setValue}/>
        </div>

        <AddedTagsBox>
          {addedTags.map(({tag, id}) => (
            <div key={id}>
              <span className='createNote__tag'>{tag}</span>
              <span className='createNote__tag-remove'
                onClick={() => tagsHandler(tag, "remove")}
              >
                <FaTimes/>
              </span>
            </div>
          ))}
        </AddedTagsBox>
        <OptionsBox>
          <ButtonOutline
            onClick={() => dispatch(toggleTagsModal({type:"add", view:true}))}
          >
            AddTag
          </ButtonOutline>
          <div>
            <label htmlFor='color'>배경색 :  </label>
            <select
              value={noteColor}
              id='color'
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value = "">White</option>
              <option value = "#ffcccc">Red</option>
              <option value = "#ccffcc">Green</option>
              <option value = "#cce0ff">Blue</option>
              <option value = "#ffffcc">Yellow</option>
            </select>
          </div>
          <div>
            <label htmlFor='priority'>우선순위 :  </label>
            <select
              value={priority}
              id='priority'
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value = "high">High</option>
              <option value = "low">low</option>
            </select>
          </div>
        </OptionsBox>
        <div className='createNote__creat-btn' style={{display:'flex', justifyContent:'flex-end'}}>
          <ButtonFill onClick={createNoteHandler}>
            {editNote ? (<span>저장하기</span>) : (<><span>생성하기</span></>)}
          </ButtonFill>
        </div>
      </Box>
    </FixedContainer>
  )
}

export default CreateNoteModal