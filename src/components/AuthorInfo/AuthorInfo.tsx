import { HStack, Avatar, VStack, Text } from '@chakra-ui/react';
import { AuthorDto } from '@/data/interfaces/author-dto';

type AuthorInfoProps = {
  author: AuthorDto;
};

const AuthorInfo = ({ author }: AuthorInfoProps) => {
  return (
    <HStack spacing={8}>
      <Avatar />
      <VStack align={'start'}>
        <Text fontWeight={'semibold'}>
          {author.firstName} {author.lastName}
        </Text>
        <Text>{author.authorBiography}</Text>
      </VStack>
    </HStack>
  );
};

export default AuthorInfo;
