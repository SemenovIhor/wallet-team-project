import { AddIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { isModalAddTransaction } from 'redux/modal/modalSlice';

const OpenModalTransitionBtn = () => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Button
        borderRadius="50"
        backgroundColor="#24CCA7"
        _hover="#24CCA7"
        boxSize="44px"
        boxShadow=" 0px 6px 15px rgba(36, 204, 167, 0.5)"
        onClick={() => dispatch(isModalAddTransaction(true))}
      >
        <AddIcon boxSize="20px" color="#FFFFFF" />
      </Button>
    </Box>
  );
};

export default OpenModalTransitionBtn;
