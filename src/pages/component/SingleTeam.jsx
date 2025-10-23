import { Button, Card } from 'antd';
import { useParams } from 'react-router-dom';
import SimpleHeader from './SimpleHeader'
const { Meta } = Card;

export default function SingleTeam() {
  const { id } = useParams();

  return (
    <>
    <SimpleHeader title={"Team"+id + " (Sakrawal West)"} /> 
    <br />
    <br /> 
           
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
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://static.vecteezy.com/system/resources/thumbnails/035/857/753/small/people-face-avatar-icon-cartoon-character-png.png" />}
  >
    <Meta title={"Player Name"+id} description="Profession" />
  </Card>
        ))}
      </div>
    </>
  );
}
