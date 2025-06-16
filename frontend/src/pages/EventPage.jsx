import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heading, Select, Button, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Image, Stack } from '@chakra-ui/react';

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    categoryId: '',
    image: ''
  });
  const [categories, setCategories] = useState([]);

  const toast = useToast();

  // fetch event by id --> event is an object
  useEffect(() => {
    console.log('Event ID:', eventId); // Debugging
    async function fetchEvent() {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data = await response.json();
        console.log('Fetched Event Data:', data); // Debugging
        
        setEvent(data);

        setFormData({
          title: data.title,
          description: data.description,
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
          categoryId: Array.isArray(data.categoryIds) && data.categoryIds.length > 0 ? data.categoryIds[0] : '',
          image: data.image
        });

      } catch (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Error",
          description: "Failed to load the event. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    fetchEvent();
  }, [eventId]);

  // fetch categories --> categories is an array of objects
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data); // Store categories in state
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    fetchCategories();
  }, []);


  // handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        startTime: formData.startTime,
        endTime: formData.endTime,
        categoryIds: [Number(formData.categoryId)],
        location: formData.location
      }
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      const data = await response.json();
      setEvent(data);
      toast({
        title: "Event updated.",
        description: "The event has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: "Error",
        description: "There was an error updating the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // handle delete the toast
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      toast({
        title: "Event deleted.",
        description: "The event has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/'); // Redirect to home page to prevent 404 errors
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

console.log("categories", categories);
console.log("event", event);


  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Heading mb={4} fontWeight="bold" textAlign="center">{event.title}</Heading>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="center">
        <Box flex="1" textAlign="center">
          <Text mb={2}><strong>Description:</strong> {event.description}</Text>
          <Text mb={2}><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</Text>
          <Text mb={2}><strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}</Text>
          <Text mb={2}><strong>Location:</strong> {event.location}</Text>
          <Text mb={2}><strong>Category:</strong> {event.categoryIds?.length > 0 ? categories.find(cat => cat.id === event.categoryIds[0])?.name : 'N/A'}</Text>
        </Box>
        <Box flex="1" maxW="300px">
          <Image src={event.image} alt={event.title} borderRadius="md" />
        </Box>
      </Stack>
      <Button colorScheme="blue" onClick={onOpen} mt={4} fontWeight="bold">EDIT</Button>
      <Button colorScheme="red" onClick={onAlertOpen} ml={4} mt={4} fontWeight="bold">DELETE</Button>
            {/* EDIT-FORM */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel fontWeight="bold">Title</FormLabel>
                <Input name="title" value={formData.title} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Description</FormLabel>
                <Input name="description" value={formData.description} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Start Time</FormLabel>
                <Input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">End Time</FormLabel>
                <Input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Location</FormLabel>
                <Input name="location" value={formData.location} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Category</FormLabel>
                <Select name="categoryId" value={formData.categoryId} onChange={handleChange}>
                  <option key="All" value="All">All</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold">Image URL</FormLabel>
                <Input name="image" value={formData.image} onChange={handleChange} />
              </FormControl>
              <Button colorScheme="blue" type="submit" mt={4} fontWeight="bold">Save</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} fontWeight="bold">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose} fontWeight="bold">
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3} fontWeight="bold">
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};
