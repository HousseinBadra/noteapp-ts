import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type shoppingCartContext={
    notes:Note[],
    editnotes:()=> void,
    addnote:(note:Note)=>void,
    deleteNote:(id:string)=>void,
    edit:(note:Note)=>void,
}

const context = React.createContext({} as  shoppingCartContext)

export function useNotes(){
    return React.useContext(context)
}

type Tag={
    label:string,
    value:string | number
  }
  
  type Note={
    tags:Tag[],
    markdown:string,
    title:string,
    id:string
  }

  type NotesProviderProps={
    children:React.ReactNode
  }

export default function NotesProvider({children}:NotesProviderProps) {

    const [notes,setnotes] = useLocalStorage<Note[]>('notes',[])

    function editnotes(){
        
    }

    function addnote(note:Note):void{
        setnotes((prev)=>{return [...prev,{...note}]})
    }

    function deleteNote(id:string){
        setnotes((prev)=>prev.filter((elem)=> elem.id !==id))
    }

    function edit(note:Note):void{
        setnotes((prev)=>prev.map((elem)=>{
            return elem.id === note.id ? {...note} : elem
        }))
    }

  return (
    <context.Provider value={{notes,editnotes,addnote,deleteNote,edit}}>
        {children}
    </context.Provider>
  )
}

