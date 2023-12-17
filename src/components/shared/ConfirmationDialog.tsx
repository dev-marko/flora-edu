import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

type ConfirmationDialogProps = {
  mainAction: () => void;
  mainActionButtonText: string;
  headerText: string;
  bodyText: string;
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.MutableRefObject<undefined>;
};

const ConfirmationDialog = ({
  mainAction,
  mainActionButtonText,
  headerText,
  bodyText,
  isOpen,
  onClose,
  cancelRef,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog
      isCentered={true}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent m={[5, 0]}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {headerText}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyText}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme="gray">
              Откажи
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                mainAction();
                onClose();
              }}
              ml={3}
            >
              {mainActionButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
