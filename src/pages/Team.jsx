import { BarsOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function Team() {
  const navigate = useNavigate();

  return (
    <>
      <h1 align="center">Our Team</h1>
      <div
        style={{
          maxWidth: "1200px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        {new Array(6).fill(1).map((_, i) => (
          <Card
          className="team-card"
            key={i}
            title={`TeamName ${i + 1}`}
            extra={
              <Button type="link" onClick={() => navigate(`/team/${i + 1}`)}>
                <BarsOutlined style={{ fontSize: 20 }} />
              </Button>
            } 
          >
            <h3>
              Team Size : <b>12</b>
            </h3>
            <h3>
              Captain Name : <b>Kamleen</b>
            </h3>
            <h3>
              Address : <b>Sakrawal West</b>
            </h3>
          </Card>
        ))}
      </div>
      <style>
        {`
            .team-card {
              width: 325px;
            }
        @media (max-width: 768px) {
            .team-card {
              width: 100%;
            }
          }
`}
      </style>
    </>
  );
}
