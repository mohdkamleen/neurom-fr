import {
  Button,
  Image,
  Input,
  message,
  Modal,
  Drawer,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarsOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import axios from '../../axios';
import Loading from './Loading';
import { setUser } from '../../redux/slices/authSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const path = window.location?.pathname;

  useEffect(() => {
    setOpenModal(
      !!user && (!user?.paymentProof || user?.paymentProof?.trim() === "")
    );
  }, [user]);


  const [loading, setLoading] = useState(false);

  const [paymentProof, setPaymentProof] = useState('');

  const [openModal, setOpenModal] = useState(
    !!user && (!user?.paymentProof || user?.paymentProof?.trim() === "")
  );

  const [openDrawer, setOpenDrawer] = useState(false);

  // Handle team update
  const handleUpdatePayment = async () => {
    if(!paymentProof) return message.warn("Payment proof is required.")
    try {
      setLoading(true)
      const res = await axios.put(
        '/players/update-payment/' + user?._id,
        { paymentProof }
      );
      if (res.data?.player) {
        dispatch(setUser(res.data?.player));
        message.success('Payment sucess');
        setOpenModal(false);
      }
    } catch (err) {
      message.error('Failed to update team');
    } finally {
      setLoading(false)
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Rules', path: '/rules' },
    { label: 'Register', path: '/register' },
    { label: 'Login', path: '/login' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
          padding: '0 5%',
          height: 60,
          background: '#fff',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Button
            type="primary"
            icon={<BarsOutlined />}
            onClick={() => setOpenDrawer(true)}
          />
          {user ? (
            <Button
              type="primary"
              onClick={() => navigate('/profile')}
            >
              Me
            </Button>
          ) : (
            <Button
              type="dashed"
              onClick={() => navigate('/login', { replace: true })
              }
            >
              Login
            </Button>
          )}
        </div>

        <h3 style={{ background: 'red', padding: "10px 20px", textTransform: "capitalize" }}>
          {path.replace("/", "") || "Home"}
        </h3>

      </div>

      {/* Drawer for Navigation */}
      <Drawer
        title="TBCL Navigation"
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        {navItems.map((item) => (
          <p
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setOpenDrawer(false);
            }}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f0',
              cursor: 'pointer',
            }}
          >
            {item.label}
          </p>
        ))}
        <br />
        {user &&
          <Button
            block
            type='danger'
            onClick={_ => {
              localStorage.removeItem("authToken")
              window.location.href = "/"
            }}>Logout</Button>}
      </Drawer>
 
      <Modal
        title={<> Make Payment to verify your account <small><a target='blank' href="https://www.instagram.com/reel/DNV4PJGTbV9/?igsh=eWo3cXZnMmpkYTU5">Guidence</a></small></>}
        open={openModal}
        footer={null}
        centered
      >
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'red' }}>
            ₹500 per player registration charge
          </h3>
          <p>  <strong>GPay / UPI ID:</strong> tbclaleague@okaxis  </p>
<p>  After complete your payment please attach your screenshot of payment proof.  </p>

          {/* QR Image */}

          <Space> 
          <Image
            src="./img/paymentqr.png"
            alt="GPay QR"
            width={200}
            style={{ margin: '20px auto' }}
          /> 
          {paymentProof && (
            <Image
              src={paymentProof}
              alt="Payment Proof"
              width={200}
              style={{ margin: '20px auto' }}
            />
          )}
          </Space>
          <br /> 

          <Space>
            <Button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = './img/paymentqr.png';
                link.download = 'paymentqr.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download QR
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText('tbclaleague@okaxis');
                message.success('UPI ID copied!');
              }}
            >
              Copy UPI ID
            </Button>

          </Space>
<br />
<br />
          {/* Upload Proof */}
          <Input
            name="file"
            type="file"
            onChange={async (e) => {
              const data = new FormData();
              data.append('file', e.target.files[0]);
              setLoading(true);
              try {
                const res = await axios.post('/upload', data);
                setPaymentProof(res.data?.path);
              } catch (err) {
                console.error('Upload failed:', err);
              } finally {
                setLoading(false);
              }
            }}
            accept="image/*"
          />
          <br />
          <br />


          {/* Submit Button */}
          <Button
            type="primary"
            onClick={handleUpdatePayment}
          >
            Submit Registration
          </Button>
        </div>
      </Modal>

          {loading && <Loading />}
    </>
  );
}
