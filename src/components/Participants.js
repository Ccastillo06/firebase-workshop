import { Box, Heading, ListItem, UnorderedList } from '@chakra-ui/layout';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

function Participants({ participantList, handleSaveParticipant }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box paddingTop={4}>
        <Heading as="h3" size="md">
          Lista de miembros 🦹‍♂️🕵️🥷
        </Heading>

        <UnorderedList spacing={1} paddingTop={2}>
          {participantList.map((participant) => (
            <ListItem key={participant.id}>{participant.name}</ListItem>
          ))}
        </UnorderedList>

        <Button marginTop={2} onClick={onOpen}>
          Añadir miembro
        </Button>
      </Box>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Nuevo miembro</DrawerHeader>
          <DrawerBody>
            <Box
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveParticipant(e);
                onClose();
              }}
            >
              <FormControl id="username" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input placeholder="John Snow" />
              </FormControl>

              <Button marginTop={2} type="submit">
                Guardar
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Participants;
