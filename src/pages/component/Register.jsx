import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col, message } from 'antd';
import jsPDF from 'jspdf';
import axios from '../../axios'; // adjust path
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const generatePlayerId = () => `tbcla-${Math.floor(1000 + Math.random() * 9000)}`;
const generatePassword = () => Math.random().toString(36).slice(-8) + "@T1";

const PlayerRegistration = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate() 
  
 const onFinish = async (values) => {
  //return message.error("Registration closed. will open soon.")
  const playerId = generatePlayerId();
  const password = generatePassword();

  const payload = {
    ...values,
    playerId,
    password,
    dob: values.dob.toISOString(),
  };

  setSubmitting(true);
  await axios.post('/players/register', payload)
    .then(res => {  
      const { token, message: serverMessage } = res.data; 
      localStorage.setItem('authToken', token);
      message.success(serverMessage || "Registered successfully");
      window.location.href = '/'; // Or navigate('/')
    })
    .catch(e => message.error(e?.response?.data?.message || "Something went wrong"))
    .finally(() => setSubmitting(false));
};


  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Player Registration Details", 20, 20);
    doc.setFontSize(11);

    const info = [
      `Player ID: ${data.playerId}`,
      `Name: ${data.name}`,
      `Password: ${data.password}`,
      `Father's Name: ${data.fatherName}`,
      `DOB: ${dayjs(data.dob).format("DD-MM-YYYY")}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Alternate Phone: ${data.alternatePhone}`,
      `Aadhar: ${data.aadhar}`,
      `Address: ${data.address}, ${data.distric}, ${data.state}`,
      `Role: ${data.role}`,
      `Batting Hand: ${data.battingHand}`,
      `Bowling Style: ${data.bowlingStyle}`,
      `Kit Size: ${data.kitSize}`
    ];

    info.forEach((line, i) => doc.text(line, 20, 30 + i * 8));
    doc.save(`${data.name}_PlayerDetails.pdf`);
  };

  return (
    <div style={{ maxWidth: 1000, margin: 'auto', padding: 20 }}>
      <h2>Player Registration <small><a target='blank' href="https://www.instagram.com/reel/DNV4PJGTbV9/?igsh=eWo3cXZnMmpkYTU5">Guidence</a></small></h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="fatherName" label="Father's Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="alternatePhone" label="Alternate Phone">
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="aadhar" label="Aadhar Number" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="distric" label="District" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select placeholder="Select Role">
                <Option value="Batsman">Batsman</Option>
                <Option value="Bowler">Bowler</Option>
                <Option value="All-rounder">All-rounder</Option>
                <Option value="Wicket-keeper">Wicket-keeper</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="battingHand" label="Batting Hand">
              <Select>
                <Option value="Right-hand">Right-hand</Option>
                <Option value="Left-hand">Left-hand</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="bowlingStyle" label="Bowling Style">
              <Select>
                <Option value="Right-arm">Right-arm</Option>
                <Option value="Left-arm">Left-arm</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="kitSize" label="Kit Size">
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Continue and next
              </Button>
            </Form.Item>

            <Button type="link" onClick={_ => navigate("/login", { replace: true })}>
              I have already an account, <big> Login here </big>
            </Button>

          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PlayerRegistration;
