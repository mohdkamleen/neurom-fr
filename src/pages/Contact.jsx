import { Form, Input, Button, message } from 'antd';
import axios from '../axios'; // Adjust the path as needed

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('/contact/create', values); // values = { name, email, message }
      message.success('Message sent successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      message.error('Failed to send message. Please try again.');
    }
  };

  return (
    <>  
    <br />
      <h1 align="center">Contact Us</h1>
      <div style={{ display: "flex", padding:"35px 0px 10px 0px", background:"lightgray", justifyContent: "space-around", margin: "30px 5%", alignItems: "center", flexWrap: 'wrap' }}>
        
        <div>
          <Form
            form={form}
            layout="vertical"
            className='contact-form'
            style={{ width: "300px",margin:"0 auto" }}
            onFinish={onFinish}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Message" name="message" rules={[{ required: true }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="form-img-container">
          <img src="img/undraw_form.svg" alt="form" style={{ width: "500px" }} />
        </div>
        <style jsx>{`
          @media (max-width: 900px) {
            .form-img-container {
              display: none;
            }
          }
          @media (max-width: 768px) {
            .contact-form{
              width:100%;
            }
        `}</style>
      </div>
    </>
  );
};

export default Contact;
