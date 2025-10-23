import { Button, Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/index';
import Loading from './Loading';

export default function Header() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Verify JWT token
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await axios.post('/auth/verifytoken', { token });
        if (res.status === 200 && res.data.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
      }
    };

    verifyToken();
  }, []);

  // Fetch current user data by token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const res = await axios.post('/user/currentuser', { token });
        const currentUser = res.data?.user;
        setUser(currentUser);

        // Open modal if user profile is incomplete
        if (!currentUser?.username || !currentUser?.phone) {
          setShowModal(true);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  // Handle user update
  const handleUpdateUser = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      message.error('Please log in to update your information.');
      return;
    }

    if (!user?.username) {
      message.warning('Username cannot be empty');
      return;
    }

    if (!user?.phone) {
      message.warning('Phone number cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/user/update', { ...user, token });

      if (response.status === 200) {
        message.success('User updated successfully!');
        setUser(response.data?.user);
        setShowModal(false); // Close modal on success
        window.location.reload();
      } else {
        message.error('Failed to update user information.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Error updating user information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '0 5%',
          height: 60,
        }}
      >
        <font style={{ cursor: "pointer" }} size={5} color="#1890ff" onClick={() => navigate("/", { replace: true })}>
          <b>
            TBC<font color="#111111">LA</font>
          </b>
        </font>

        <div style={{ display: 'flex', gap: 25, alignItems: 'center' }}>
          {isAuthenticated ? (
            <Button type="dashed" onClick={() => navigate('/profile')}>
              Me
            </Button>
          ) : (
            <Button type="dashed" onClick={() => navigate('/login')}>
              Register/Login
            </Button>
          )}
        </div>
      </div>

      {/* Profile Completion Modal */}
      {showModal && (
        <Modal
          width={400}
          footer={false}
          open={true}
          closable={!loading}
          onCancel={() => !loading && setShowModal(false)}
        >
          <h3>User Name:</h3>
          <Input
            type="text"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user?.username || ''}
            placeholder="xyz username"
          />
          <br /><br />
          <h3>User Phone:</h3>
          <Input
            type="text"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            value={user?.phone || ''}
            placeholder="0000000000"
          />
          <br /><br />
          <Button loading={loading} onClick={handleUpdateUser} style={{ margin: 'auto', display: 'block' }}>
            Update Profile
          </Button>
        </Modal>
      )}

      {loading && <Loading />}
    </>
  );
}
