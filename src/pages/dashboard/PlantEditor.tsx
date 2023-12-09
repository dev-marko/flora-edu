import CustomH1 from '@/components/custom-markdown/CustomH1';
import CustomH2 from '@/components/custom-markdown/CustomH2';
import CustomH3 from '@/components/custom-markdown/CustomH3';
import CustomH4 from '@/components/custom-markdown/CustomH4';
import CustomH5 from '@/components/custom-markdown/CustomH5';
import CustomH6 from '@/components/custom-markdown/CustomH6';
import {
  Box,
  Flex,
  ListItem,
  OrderedList,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';
import Markdown from 'react-markdown';

const PlantEditor = () => {
  const [markdown, setMarkdown] = useState('...прегледај ја содржината!');
  return (
    <Flex w={'full'} align={'start'} justify={'space-between'} gap={8}>
      <Box flex={1} h={'95vh'}>
        <Textarea
          onChange={(event) => setMarkdown(event.target.value)}
          resize={'none'}
          border="2px"
          borderColor="gray.300"
          rounded={'lg'}
          h={'95vh'}
          _focus={{
            background: 'gray.200',
          }}
          focusBorderColor={'primary.300'}
          placeholder="Внеси текст тука..."
        ></Textarea>
      </Box>
      <Box
        flex={1}
        h={'95vh'}
        border="2px"
        borderColor="gray.300"
        rounded={'lg'}
        p={4}
      >
        <Markdown
          components={{
            h1: CustomH1,
            h2: CustomH2,
            h3: CustomH3,
            h4: CustomH4,
            h5: CustomH5,
            h6: CustomH6,
            ol: OrderedList,
            ul: UnorderedList,
            li: ListItem,
          }}
        >
          {markdown}
        </Markdown>
      </Box>
    </Flex>
  );
};

export default PlantEditor;
