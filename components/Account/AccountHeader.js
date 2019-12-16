import {Header, Icon, Segment, Label} from 'semantic-ui-react';

// Fetching user data to display on the page
function AccountHeader({email, name, createdAt, role}) {
  return (
    <Segment secondary inverted color="teal">
      <Label
        color="teal"
        size="large"
        ribbon
        icon="privacy"
        style={{textTransform: 'capitalize'}}
        content={role}
      />
      <Header inverted textAlign='center' as='h1' icon>
        <Icon name="user" />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined {createdAt}</Header.Subheader>
      </Header>
    </Segment>
  )
}

export default AccountHeader;
