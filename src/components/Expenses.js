import { Fragment } from 'react';
import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/layout';
import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useDisclosure,
} from '@chakra-ui/react';

function Expenses({ expenseList, handleSaveExpense, participantList }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box paddingTop={4}>
        <Heading as="h3" size="md">
          Gastos por persona 💶
        </Heading>

        <List spacing={2} paddingTop={2}>
          {(expenseList || []).map((expense, index) => (
            <Fragment key={index}>
              <ListItem>
                <ListIcon as={SmallAddIcon} color="green.500" />

                <Text as="b">{expense.title}</Text>
                <Text>
                  <b>Cantidad:</b> {expense.price} €
                </Text>
                <Text>
                  <b>Pagado por:</b> {expense.paidBy.name}
                </Text>
              </ListItem>

              <Divider paddingTop={1} />
            </Fragment>
          ))}
        </List>

        <Button marginTop={2} onClick={onOpen}>
          Añadir gasto
        </Button>
      </Box>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Nuevo gasto</DrawerHeader>
          <DrawerBody>
            <Box
              as="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveExpense(e);
                onClose();
              }}
            >
              <FormControl id="paidBy" isRequired>
                <FormLabel>¿Quién ha pagado?</FormLabel>

                <Select placeholder="Selecciona una persona">
                  {participantList.map((participant) => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="price" isRequired>
                <FormLabel>¿Cuánto ha costado?</FormLabel>

                <NumberInput precision={2} step={0.01}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl id="title" isRequired>
                <FormLabel>¿Qué habéis comprado?</FormLabel>
                <Input placeholder="Cena en mexicano" />
              </FormControl>

              {/* TODO: Add new picture field to use Firestore Storage */}

              <Button marginTop={2} type="submit">
                Guardar gasto
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Expenses;
