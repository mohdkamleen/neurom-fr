import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoHeader = () => {
  const navigate = useNavigate()
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",background:"black"}}>
        <br />
        <h3 style={{color:"white",textAlign:"center",padding:"0 10px"}}> Let's begin a new chapter &nbsp;
          <Button type='primary'  onClick={() => navigate('/register')}>Register</Button></h3>
        <img style={{maxWidth:"90%",maxHeight:"400px"}} src="./img/logo.jpeg" alt="" />
    </div>
  )
}

export default LogoHeader