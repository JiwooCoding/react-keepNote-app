import { v4 } from "uuid";

const notes = [
   { 
        title:"노트1 타이틀",
        content: "노트1 내용",
        tags: [{tag:"coding", id: v4()}],
        color: "#cce0ff",
        priority: "high",
        isPinned: true,
        isRead: false,
        date: "13/11/23 11:44PM",
        createdTime: new Date("Mon Dec 13 2023 11:44:22").getTime(),
        editedTime:null,
        id: v4()
   },
   { 
        title:"노트2 타이틀",
        content: "노트2 내용",
        tags: [{tag:"exercise", id: v4()}],
        color: "#ffcccc",
        priority: "high",
        isPinned: true,
        isRead: false,
        date: "13/11/23 11:44PM",
        createdTime: new Date("Mon Dec 13 2023 11:44:22").getTime(),
        editedTime:null,
        id: v4()
    }
]

export default notes;