import { FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { NotesIconBox } from "../styles/styles"
import {RiInboxUnarchiveFill} from 'react-icons/ri';
import { Note } from "../types/note";
import { Dispatch } from "@reduxjs/toolkit";
import { toggleCreateNoteModal } from "../store/modal/modalSlice";
import { deleteNote, restoreNote, setArchiveNote, setEditNote, setTrashNote, unArchiveNote } from "../store/noteList/noteListSlice";

const getRelevantBtns = (type:string, note:Note, dispatch:Dispatch) => {
    
    const clickHandler = () => {
        dispatch(toggleCreateNoteModal(true))
        //EditNote는 null | Note
        //Modal창 열리면 모달 창에 Note 데이터 들어온다.
        dispatch(setEditNote(note))
    }

    if(type === "archive") {
        return(
            <>
                <NotesIconBox
                    onClick={() => dispatch(unArchiveNote(note))}
                    //data-info: 툴팁 나오게 해주는 기능
                    data-info="Unarchive"
                >
                    <RiInboxUnarchiveFill style={{fontSize: '1rem'}}/>
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(setTrashNote(note))}
                    //data-info: 툴팁 나오게 해주는 기능
                    data-info="Delete"
                >
                    <FaTrash style={{fontSize: '1rem'}}/>
                </NotesIconBox>
            </>
        )
    }else if(type === "trash"){
        return(
            <>
                <NotesIconBox
                    onClick={() => dispatch(restoreNote(note))}
                    data-info="Restore"
                >
                    <FaTrashRestore style={{fontSize: '1rem'}}/>
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(deleteNote(note))}
                    data-info="Delete"
                >
                    <FaTrash style={{fontSize: '1rem'}}/>
                </NotesIconBox>
            </>
        )
    }else{
        return(
            <>
                <NotesIconBox
                    //클릭 시 편집 모달 나올 수 있게 해줘야 한다.
                    onClick={clickHandler}
                    data-info="Edit"
                >
                    <FaEdit style={{fontSize: '1rem'}}/>
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(setArchiveNote(note))}
                    data-info="Archive"
                >
                    <FaTrashRestore style={{fontSize: '1rem'}}/>
                </NotesIconBox>
                <NotesIconBox
                    onClick={() => dispatch(setTrashNote(note))}
                    data-info="Delete"
                >
                    <FaTrash style={{fontSize: '1rem'}}/>
                </NotesIconBox>
            </>
        )
    }
}

export default getRelevantBtns;