import React from 'react'
import { Container, Navbar ,Button,Row,Badge} from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import { useNotes } from '../contexts/NotesContext'
import styles from '../css/noteview.module.css'
import { Link } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useNavigate } from 'react-router-dom'
export default function NoteView() {

   const noteId=useParams().noteid
   console.log(noteId)
   const {notes,deleteNote}=useNotes()

   const note=notes.filter((n)=> n.id === noteId)[0]

   const navigation = useNavigate()

  return (
    <>
      <Navbar bg="light" expand="lg">
      <Container>
       <h1>{note.title}</h1>
         <div className={styles.buttons}>
         <Link to={`/edit/${note.id}`}><Button variant='primary'>Edit</Button></Link>
       <span>  <Button variant='danger' onClick={()=>{deleteNote(note.id);navigation('/')}}>Delete</Button></span>
         <Link to='/'><Button variant='info'>Back</Button></Link>
         </div>  
      </Container>
    </Navbar>  
         
            <div className={`${styles.tagsContainer} mt-3`}>
          {note.tags.map((elem,index)=>{
              return <Badge key={index} color={'dark'}>{elem.label}</Badge>
          })}
          </div>
   <Container className='mt-3'>
   <ReactMarkdown >{note.markdown}</ReactMarkdown>
       
    </Container>
          
       
    </>
  )
}
