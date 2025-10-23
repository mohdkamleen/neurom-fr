import { AimOutlined, RightOutlined, VerifiedOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './component/Loading'
import SimpleHeader from './component/SimpleHeader'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const { team } = useSelector(state => state.teams);
  const [loading, setloading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false)
  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem("authToken")
    window.location.href = "/"
  }

  return (
    <div style={{ margin: "0 5%" }}>
      <SimpleHeader title={"Profile"} />
      <br />
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <div style={{ width: "60px", height: "60px", background: "lightgray", borderRadius: "50px", display: "grid", placeItems: "center", fontSize: "20px", margin: "10px 0px" }}>{user?.name.length > 0 && (user.name[0] + (user.name.split(" ")[1] ? user.name.split(" ")[1][0] : "")).toUpperCase()}</div>
        {user?.name &&
          <div style={{ fontSize: "18px", marginTop: "18px" }}>
            <b>{user?.name.toUpperCase()}</b> {user?.paymentProof ? (<font color="blue">(Under Verification)</font>) : user?.verfied ? (<font color="green">(Verified)</font>) : (<font color="red"> (Unverified) </font>)} <br />
            <p> {user.phone} </p>
          </div>}
      </div>
      <h3>{user?.email}</h3>
      <AimOutlined /> {user?.address ? `${user.address || ''} ${user?.distric || ''} ${user?.state || ''}` : <i>team location</i>}
      <br /><br />
      {!user?.paymentProof && <Button onClick={_ => window.location.reload()} type='primary'>Complete your Payment</Button>}
      <br /><br />

      {/* this is menu bars  */}
      <big onClick={() => message.info("Coming soon!!!!!!!")} style={{ width: "100%", cursor: "pointer", padding: "7px 0", maxWidth: "500px", display: "flex", justifyContent: "space-between", alignItems: "center" }}> Edit account<RightOutlined style={{ fontSize: "12px" }} /> </big>
      <big onClick={() => message.info("Coming soon!!!!!!!") || navigate("/manageteam")} style={{ width: "100%", cursor: "pointer", padding: "7px 0", maxWidth: "500px", display: "flex", justifyContent: "space-between", alignItems: "center" }}> Manage Team <RightOutlined style={{ fontSize: "12px" }} /> </big>
      <hr style={{ height: "1px", background: "lightgray", border: "none" }} />

      <big onClick={() => setLogoutModal(true)} style={{ width: "100%", cursor: "pointer", padding: "7px 0", maxWidth: "500px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>Log Out <RightOutlined style={{ fontSize: "12px" }} /> </big>

      <br /><br />

      <Modal width={300} closeIcon onCancel={() => setLogoutModal(false)} footer={false} open={logoutModal}>
        <big>Are you sure want to logout ?</big> <br /> <br />
        <Button onClick={() => setLogoutModal(false)}>Cancel</Button> &ensp;
        <Button type='danger' onClick={handleLogout}>Logout</Button>
      </Modal>
      {loading && <Loading />}
    </div>
  )
}

export default Profile