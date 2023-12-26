import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, StyledInput, TagsBox } from './TagsModal.styles';
import { toggleTagsModal } from '../../../store/modal/modalSlice';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import getStandardName from '../../../utils/getStandardName';
import { v4 } from 'uuid';
import { addTags, deleteTags } from '../../../store/tags/tagsSlice';
import { Tag } from '../../../types/tag';
// import { removeTags } from '../../../store/noteList/noteListSlice';

interface TagsModalProps{
  type:string;
  addedTags?: Tag[];
  handleTags?: (tag:string, type:string) => void;
}

const TagsModal = ({type, addedTags, handleTags}:TagsModalProps) => {

  const dispatch = useAppDispatch();
  const {tagsList} = useAppSelector((state) =>state.tagsSlice);
  const [inputText, setInputText] = useState("");

  const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!inputText){
      return;
    }

    dispatch(addTags({tag: inputText.toLocaleLowerCase(), id: v4()}))
    setInputText("");
  }

  const deleteTagsHandler =(id:string) => {
    dispatch(deleteTags(id));
    // dispatch(removeTags(tag))
  }

  return (
    <FixedContainer>
      <Box>
        <div className='editTags__header'>
          <div className='editTags__title'>
            {type === "add" ? "Add" : "Edit"} tags
          </div>
          <DeleteBox 
            className='editTags__close'
            onClick={() => dispatch(toggleTagsModal({type, view: false}))}
          >
            <FaTimes/>
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler} style={{display: 'inline-block'}}>
          <StyledInput 
            type='text' 
            value={inputText} 
            placeholder='새로운 태그를 생성해주세요'
            onChange={(e) => setInputText(e.target.value)}
          />
          <TagsBox>
            {tagsList.map(({tag, id}) => (
              <li key={id}>
                <div className='editTags__tag'>
                  {getStandardName(tag)}
                </div>
                {type === "edit" ? (
                  <DeleteBox onClick={() => deleteTagsHandler(id)}>
                    <FaTimes/>
                  </DeleteBox>
                ) : (
                  <DeleteBox>
                    {addedTags?.find(
                      (addedTag : Tag) => addedTag.tag === tag.toLowerCase()
                    ) ? (
                      <FaMinus onClick={() => handleTags!(tag, "remove")}/>
                    ) : (
                      <FaPlus onClick={() => handleTags!(tag, "add")}/>
                    )}
                  </DeleteBox>
                )}
                
              </li>
            ))}
          </TagsBox>
        </form>
      </Box>
    </FixedContainer>
  )
}

export default TagsModal