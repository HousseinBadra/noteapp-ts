import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {useState,useRef} from 'react'
import {Form,Container,Row,Col,Card, Badge , Stack,Navbar,Button} from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import { useNotes } from '../contexts/NotesContext'
import {useNavigate,useParams} from 'react-router-dom'


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

  
export default function Edit() {

    const noteId=useParams().id

   const {notes,edit}=useNotes()

   const note=notes.filter((n)=> n.id === noteId)[0]


    const [tags,settags]=useState<Tag[]>(note.tags)
 
    const markdownref=useRef<HTMLTextAreaElement>(null)
    const titleref=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    function handleSubmit(e:FormEvent){
      e.preventDefault()
      return
  }

  function editNote(){
    edit({title:titleref.current?.value || '',tags:tags,markdown:markdownref.current?.value || '',id:noteId || ''})
    navigate(`/note/${noteId}`)
  }

  return (
    <>
     <Navbar bg="light" expand="lg">
    <Container>
      <h1>Edit Note</h1>
    </Container>
   </Navbar>
   <Form className='mt-3' onSubmit={handleSubmit}>
      <Container>
       <Row>
      <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control ref={titleref} type="text" placeholder="note title"defaultValue={note.title} />
      </Form.Group></Col>
      <Col>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Tags</Form.Label>
        <CreatableSelect isMulti options={tags}
         onCreateOption={(label:string)=>{settags((prev)=>{return [...prev,{label:label,value:label}]})}} 
         onChange={(tags)=>{ settags(tags.map((elem)=> {return {...elem}})) }} value={tags}></CreatableSelect>
      </Form.Group>
      </Col>
       </Row>
       <Row>
       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
       
        <Form.Control as='textarea' defaultValue={note.markdown} ref={markdownref}  rows={15} />
      </Form.Group>
       </Row>
       <div style={{display:'flex',justifyContent:'end',padding:'1em',gap:'.5em',alignItems:'center'}}>
       <Link to={`/note/${noteId}`}><Button variant='danger'>Back</Button></Link>

       <Button variant='primary'  onClick={editNote}>Edit</Button>
       
        </div>
      </Container>
    </Form>
    </>
  )
}
