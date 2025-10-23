import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            background: "rgba(255,255,255,.2)",
            zIndex: "999",
            position: "fixed",
            top: "0", left: "0",
            display: "grid",
            placeItems: "center"
        }}>
            <Spin spinning={true} />
        </div>
    )
}

export default Loading