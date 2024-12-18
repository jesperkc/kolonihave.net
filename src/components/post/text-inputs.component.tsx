import { Button, Flex, FormControl, FormLabel, Input, Progress, Stack, Text, Textarea } from "@chakra-ui/react";

interface IProps {
  formData: {
    title: string;
    description: string;
  };
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmitPost: () => void;
  isLoading: boolean;
}

const TextInputs: React.FC<IProps> = ({ formData, handleFormChange, handleSubmitPost, isLoading }) => {
  return (
    <Stack width="100%" spacing="3">
      <FormControl isRequired>
        <FormLabel>Titel</FormLabel>
        <Input value={formData.title} onChange={handleFormChange} name="title" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Indlæg</FormLabel>
        <Textarea value={formData.description} onChange={handleFormChange} name="description" height="120px" />
      </FormControl>

      <Flex justify="flex-end" width="100%" py={2}>
        <Button disabled={false} onClick={handleSubmitPost} isLoading={isLoading}>
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
