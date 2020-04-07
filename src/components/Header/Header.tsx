import * as React from "react";
import { Header as SemHeader, Icon } from "semantic-ui-react";

interface IProps {
  title: string;
}

const Header = React.memo((props: IProps) => {
  const { title } = props;

  return (
    <SemHeader as="h1" icon inverted>
      <Icon circular inverted name="users" color="violet" />
      <SemHeader.Content>{title}</SemHeader.Content>
    </SemHeader>
  );
});

export default Header;
