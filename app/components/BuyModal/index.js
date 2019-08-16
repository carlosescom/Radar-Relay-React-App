import React from 'react'
import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Input,
  Heading,
  Modal,
  Text
} from 'rimble-ui'

class BuyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      requiredLiquidity: 0,
    };
    this.asset = props.asset
    this.closeModal = this.closeModal.bind(this);
    this.confirm = this.confirm.bind(this);
    this.openModal = this.openModal.bind(this);
    this.setRequiredLiquidity = this.setRequiredLiquidity.bind(this);
  }

  confirm() {
    this.props.handleConfirm(
      this.asset,
      this.state.requiredLiquidity
    )
  }

  closeModal(e) {
    e.preventDefault();
    this.setState((state, props) => ({
      isOpen: false,
    }));
  }

  openModal(e) {
    e.preventDefault();
    this.setState((state, props) => ({
      isOpen: true,
    }));
  }

  setRequiredLiquidity(e) {
    e.preventDefault();
    this.setState({ requiredLiquidity: e.target.value });
  }

  componentDidUpdate() {
    console.log('BuyModal.componentDidUpdate',this.state)
  }
  

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.openModal}>Buy</Button>

        <Modal isOpen={this.state.isOpen}>
          <Card width={'420px'} p={0}>
            <Button.Text
              icononly
              icon={'Close'}
              color={'moon-gray'}
              position={'absolute'}
              top={0}
              right={0}
              mt={3}
              mr={3}
              onClick={this.closeModal}
            />

            <Box p={4} mb={3}>
              <Heading.h3>Test</Heading.h3>
              <Text>Enter the amount of liquidity that will be needed for a leveraged position.</Text>
              <Field label="Amount">
                <Input
                  type="number"
                  required={true}
                  value={this.state.requiredLiquidity}
                  onChange={this.setRequiredLiquidity}
                />
              </Field>
            </Box>

            <Flex
              px={4}
              py={3}
              borderTop={1}
              borderColor={'#E8E8E8'}
              justifyContent={'flex-end'}
            >
              <Button.Outline onClick={this.closeModal}>Cancel</Button.Outline>
              <Button onClick={this.confirm} ml={3}>Confirm</Button>
            </Flex>
          </Card>
        </Modal>
      </React.Fragment>
    );
  }
}

export default BuyModal;