import * as React from "react";
import { Segment, Grid } from "semantic-ui-react";

interface IProps {
  users: string[];
}

const VideoChat = (props: IProps) => {
  const { users } = props;

  return (
    <Segment style={{ display: "flex", alignItems: "center" }}>
      <Grid centered relaxed columns={4}>
        <Grid.Row centered columns={1} style={{ height: "70%" }}>
          <Grid.Column>
            <video
              autoPlay
              muted
              className="test"
              style={{ maxWidth: "100%", display: "block", margin: "0 auto" }}
            ></video>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ height: "30%" }}>
          {users.map((user, i) => (
            <Grid.Column key={user + i}>
              <video
                autoPlay
                muted
                className="test"
                style={{ maxWidth: "100%" }}
              ></video>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default VideoChat;
