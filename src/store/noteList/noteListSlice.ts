import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../../types/note";
import notes from "../../types/notesData";


interface NoteState {
    mainNotes: Note[],
    archiveNotes: Note[],
    trashNotes: Note[],
    editNote: null | Note, //note객체 하나만 가지고 있기 때문에 배열이 아님
}

const initialState:NoteState = {
    mainNotes:[...notes],
    archiveNotes: [],
    trashNotes: [],
    editNote: null,
}

enum noteType {
    mainNotes = 'mainNotes',
    archiveNotes = 'archiveNotes',
    trashNotes = 'trashNotes'
}

const noteListSlice = createSlice({
    name:"notesList",
    initialState,
    reducers:{
        // removeTags:(state, {payload}) => {
        //     state.mainNotes = state.mainNotes.map((note) => ({
        //         ...note,
        //         tags: note.tags.filter(({tag}) => tag !== payload.tag)
        //     }))
        // },
        
        //note생성 또는 수정해서 mainNotes 업데이트 해주는 기능
        setMainNote:(state, {payload}) => {
            // 해당 note 수정
            if(state.mainNotes.find(({id}) => id === payload.id)){
                state.mainNotes = state.mainNotes.map((note) => 
                note.id === payload.id ? payload : note)
            // note 새롭게 생성
            } else{
                state.mainNotes.push(payload);
            }
        },
        //삭제 버튼 누르면 해당 NoteCard 없어짐
        setTrashNote:(state, {payload}) => {
            //mainNotes에서 없애주고, 
            state.mainNotes = state.mainNotes.filter(({id}) => id !== payload.id);
            //archiveNotes에 있을 경우에도 없애주고, 
            state.archiveNotes = state.archiveNotes.filter(({id}) => id !== payload.id);
            //trashNotes에 payload를 넣어주고 pin을 없애준다.
            state.trashNotes.push({...payload, isPinned: false})
        },
        //다른 곳에 있는 NoteCard를 archive에 넣어주기
        setArchiveNote:(state,{payload}) => {
            state.mainNotes = state.mainNotes.filter(({id}) => id !== payload.id);
            state.archiveNotes.push({...payload, isPinned: false})
            //isPinned의 속성을 변경시키기 위해서 전개연산자 사용함
        },
        unArchiveNote:(state, {payload}) => {
            state.archiveNotes = state.archiveNotes.filter(({id}) => id !== payload.id);
            state.mainNotes.push(payload)
        },
        //trash에 있는 note를 restore버튼 누르면 다시 mainNote로 이동하는 기능
        restoreNote:(state, {payload}) => {
            state.trashNotes = state.trashNotes.filter(({id}) => id !== payload.id);
            state.mainNotes.push(payload)
        },
        //trashNote에 있는 note를 영구적으로 삭제하는 기능
        deleteNote:(state, {payload}) => {
            state.trashNotes = state.trashNotes.filter(({id}) => id !== payload.id);
        },
        //mainNote에 있는 note가 pinned에 들어가거나 뺄 수 있도록 하는 기능
        setPinnedNote:(state, {payload}) => {
            state.mainNotes = state.mainNotes.map((note) => 
                note.id === payload.id ? {...note, isPinned: !note.isPinned} : note);
        },
        setEditNote:(state, {payload}) => {
            state.editNote = payload;
        },
        //해당 NoteCard를 클릭하면 읽기전용 모달이 나오는 기능
        //isRead : boolean Type
        readNote:(state, {payload}) => {
            const {type, id} = payload;

            const setRead = (notes:noteType) => {
                state[notes] = state[notes].map((note:Note) => 
                note.id === id ? {...note, isRead: !note.isRead} : note)
            }

            if(type === "archive") {
                setRead(noteType.archiveNotes)
            } else if(type === "trash"){
                setRead(noteType.trashNotes)
            } else{
                setRead(noteType.mainNotes)
            }
        },
    },
})

export const {
    setArchiveNote,
    setEditNote,
    readNote,
    setMainNote,
    setTrashNote,
    unArchiveNote,
    restoreNote,
    deleteNote,
    setPinnedNote
} = noteListSlice.actions;
export default noteListSlice.reducer;