import {
  Button, Form, Input, Card, Select,
  Table, Modal, message, Space,
  Spin
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPlayers, addPlayer, updatePlayer, deletePlayer
} from '../redux/slices/playerSlice';
import {
  fetchTeams, addTeam, updateTeam
} from '../redux/slices/teamSlice';
import { roleOptions } from '../constants/roles';
import axios from '../axios';

const ManageTeam = () => {
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState(false)
  const { user } = useSelector((state) => state.auth);
  const { team, loading: teamLoading } = useSelector((state) => state.teams);
  const { players, loading: playerLoading } = useSelector((state) => state.players);

  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [payment, setPayment] = useState('');
  const [editTeamModalVisible, setEditTeamModalVisible] = useState(false);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const [teamForm] = Form.useForm();
  const [playerForm] = Form.useForm();

  // Load team and players on user load
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchTeams(user._id)).then((res) => {
        if (res.payload?._id) {
          dispatch(fetchPlayers(res.payload._id));
        } else {
          setTeamModalVisible(true);
        }
      });
    }
  }, [user, dispatch]);

  // Handle team creation
  const handleaddTeam = async () => {
    try {
      const values = await teamForm.validateFields();
      if (!payment) {
        message.warn("Payment is required.");
        return
      }
      const teamRes = await axios.post("/teams/create/", { ...values, owner: user?._id, payment })
      const res = await dispatch(addTeam(teamRes.data)); 
        message.success('Team created');
        setTeamModalVisible(false); 
    } catch (err) {
      console.error(err);
    }
  };

  // Handle team update
  const handleUpdateTeam = async () => {
    try {
      const values = await teamForm.validateFields();
      const res = await axios.put("/teams/update/" + team?._id, values)
      await dispatch(updateTeam(res.data));
      setEditTeamModalVisible(false);
      message.success('Team updated');
    } catch (err) {
      message.error('Failed to update team');
    }
  };

  // Handle player add/update
  const handlePlayerSave = async () => {
    try {
      const values = await playerForm.validateFields();

      if (editingPlayer) {
        await dispatch(updatePlayer({ playerId: editingPlayer._id, data: values }));
        message.success('Player updated');
      } else {
        const playerRes = await axios.post("/players/create/", { ...values, teamId: team?._id })
        await dispatch(addPlayer(playerRes.data));
        message.success('Player added');
      }

      setPlayerModalVisible(false);
      playerForm.resetFields();
      setEditingPlayer(null);
    } catch (err) {
      message.error('Error saving player');
    }
  };

  const handlePlayerEdit = (player) => {
    setEditingPlayer(player);
    playerForm.setFieldsValue(player);
    setPlayerModalVisible(true);
  };

  const handlePlayerDelete = (id) => {
    dispatch(deletePlayer(id));
    message.success('Player deleted');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Role', dataIndex: 'role' },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handlePlayerEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handlePlayerDelete(record._id)}>Delete</Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ maxWidth: 1000, margin: 'auto', padding: 20 }}>
      <h1>Manage Team & Players</h1>

      {team && (
        <Card
          title={<>Team Info &nbsp; {user?.verfied ? (<font color="green">(Verified)</font>) : (<font color="red"> (Unverified) </font>)}</>}
          extra={<Button
            disabled={!user?.verfied} onClick={() => {
              teamForm.setFieldsValue(team);
              setEditTeamModalVisible(true);
            }}>Edit</Button>}
          style={{ marginBottom: 20 }}
        >
          <p><strong>Name:</strong> {team.name}</p>
          <p><strong>Address:</strong> {team.address}</p>
        </Card>
      )}

      <Card
        title="Players"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setEditingPlayer(null);
              playerForm.resetFields();
              setPlayerModalVisible(true);
            }}
            disabled={!team?._id || !user?.verfied}
          >
            Add Player
          </Button>
        }
      >
        {!user?.verfied ? (
          <p>
            <i>Please be verify (make payment) then you can create players.</i> <br />
            <i>After Payment it will take upto 12 hour to verify.</i>
          </p>
        ) : (
          <Table
            dataSource={players}
            columns={columns}
            rowKey="_id"
            loading={playerLoading}
            pagination={false}
          />
        )}
      </Card>

      {/* Modals */}
      <Modal
        open={teamModalVisible}
        title="Create Team"
        onOk={handleaddTeam}
        okText="Create"
        closable={false}
        maskClosable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Form layout="vertical" form={teamForm} encType='multipart/form-data'>
          <Form.Item name="name" label="Team Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item label="Payment Proof">
            <input
              name="file"
              accept="image/*"
              type="file"
              onChange={async (e) => {
                setUploadLoading(true);
                const data = new FormData();
                data.append('file', e.target.files[0]);

                try {
                  const res = await axios.post('/upload', data);
                  setPayment(res.data?.path); // Save path for later use
                } catch (err) {
                  console.error('Upload failed:', err);
                } finally {
                  setUploadLoading(false);
                }
              }}
            />
            <br />
            {payment && <img height={100} alt="error" src={payment} />}
            {uploadLoading && <Spin />}
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        open={editTeamModalVisible}
        title="Edit Team"
        onOk={handleUpdateTeam}
        onCancel={() => setEditTeamModalVisible(false)}
        okText="Update"
      >
        <Form layout="vertical" form={teamForm}>
          <Form.Item name="name" label="Team Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={playerModalVisible}
        title={editingPlayer ? 'Edit Player' : 'Add Player'}
        onOk={handlePlayerSave}
        onCancel={() => {
          setPlayerModalVisible(false);
          setEditingPlayer(null);
        }}
        okText={editingPlayer ? 'Update' : 'Add'}
      >
        <Form form={playerForm} layout="vertical">
          <Form.Item name="name" label="Player Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select options={roleOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTeam;
