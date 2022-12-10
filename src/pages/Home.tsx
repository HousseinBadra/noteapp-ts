import React, { FormEvent, useMemo } from 'react'
import NavbarComponent from '../Components/Navbar'
import { useState
 } from 'react'
 import {Form,Container,Row,Col,Card, Badge , Stack} from 'react-bootstrap'
 import CreatableSelect from 'react-select/creatable'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Link } from 'react-router-dom'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import styles from '../css/home.module.css'
import { useNotes } from '../contexts/NotesContext'

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

export default function Home() {

   const {notes}= useNotes()

    const [text,settext]=useState('')
    const [tags,settags]=useState<Tag[]>([])

    const filtred=useMemo<Note[]>(()=>{
      const tagsString= tags.map((tag)=>tag.label)
     
      return notes.filter((note)=> note.title.indexOf(text.trim()) >= 0 || text == '').filter((elem)=>{
        const owntags=elem.tags.map((tag)=>tag.label)
        if (tagsString.length === 0) return true
        return tagsString.every((s)=> owntags.indexOf(s) >= 0)

      })
    },[text,tags])

    function handleSubmit(e:FormEvent){
        e.preventDefault()
        return
    }

  return (
    <div>
     <NavbarComponent />
     <Form className='mt-3' onSubmit={handleSubmit}>
      <Container>
       <Row>
      <Col><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Search for note</Form.Label>
        <Form.Control type="text" placeholder="note title" value={text} onChange={(e)=>{settext(e.target.value)}}/>
      </Form.Group></Col>
      <Col>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Search for tags</Form.Label>
        <CreatableSelect isMulti options={tags}
         onCreateOption={(label:string)=>{settags((prev)=>{return [...prev,{label:label,value:label}]})}} 
         onChange={(tags)=>{ settags(tags.map((elem)=> {return {...elem}})) }} value={tags}></CreatableSelect>
      </Form.Group>
      </Col>
       </Row>
      </Container>
    </Form>
    <Container>
      <Row style={{gap:'1em',justifyContent:'start'}}>
        {filtred.map((elem,index)=>{
          return <Col className={styles.note} key={index} xs='5' sm='4' md='3'>
            <Link className={styles.link} to={`/note/${elem.id}`}>
                 <h2 className={styles.notesTitle}>{elem.title}</h2>      
               <div className={styles.tagsContainer}>
                {elem.tags.map((tag,index)=>{return <Badge key={index} color={'dark'}>{tag.label}</Badge>})}
               </div>
              
            </Link>
          </Col>
        })}
      </Row>
    </Container>
    </div>
  )
}
