import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {useState,useRef} from 'react'
import {Form,Container,Row,Col,Card, Badge , Stack,Navbar,Button} from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import { useNotes } from '../contexts/NotesContext'
import {useNavigate} from 'react-router-dom'

function generateUUID():string { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
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

export default function CreateNote() {
 
  const {addnote} = useNotes()

  const [tags,settags]=useState<Tag[]>([])
 
  const markdownref=useRef<HTMLTextAreaElement>(null)
  const titleref=useRef<HTMLInputElement>(null)
  const navigate=useNavigate()
  function handleSubmit(e:FormEvent){
    e.preventDefault()
    return
}

function createNote(){
  
  addnote({title:titleref.current?.value || '',tags:tags,markdown:markdownref.current?.value || '',id:generateUUID()})
  navigate('/')
}

  return (
    <>
   <Navbar bg="light" expand="lg">
    <Container>
     <h1>Create Note</h1>
    </Container>
   </Navbar>
   <Form className='mt-3' onSubmit={handleSubmit}>
      <Container>
       <Row>
      <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control ref={titleref} type="text" placeholder="note title"defaultValue={''} />
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
       
        <Form.Control as='textarea' defaultValue={""} ref={markdownref}  rows={15} />
      </Form.Group>
       </Row>
       <div style={{display:'flex',justifyContent:'end',padding:'1em',gap:'.5em',alignItems:'center'}}>
       <Link to='/'><Button variant='danger'>Cancel</Button></Link>

       <Button variant='primary'  onClick={createNote}>Create</Button>
       
        </div>
      </Container>
    </Form>
  </>
  )
}
