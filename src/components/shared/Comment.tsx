import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import HeartButton from './HeartButton';
import moment from 'moment';
import { CommentUserInfo } from '@/data/interfaces/comment-user-info';
import { FeatureEntities } from '@/data/enums/feature-entities';

type CommentProps = {
  id: string;
  user?: CommentUserInfo;
  content: string;
  date: Date;
  isLiked: boolean;
  likeCount: number;
  featureEntity: FeatureEntities;
};

const Comment = ({
  id,
  user,
  content,
  date,
  isLiked,
  likeCount,
  featureEntity,
}: CommentProps) => {
  return (
    <Flex w={'full'} key={id}>
      <Box px={3}>
        <Avatar size={'sm'} src={user?.avatarImageUrl} />
      </Box>
      <Box flex={1}>
        <VStack align={'start'}>
          <HStack>
            <Text fontWeight={'semibold'}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text>{moment(date).format('LLL')}</Text>
          </HStack>
          <Box>
            <Text textAlign={'justify'}>{content}</Text>
          </Box>
          <HStack w={'full'} spacing={4}>
            <HeartButton
              entityId={id}
              entityBeingLiked={featureEntity}
              tooltipLabel="Зачувај растение"
              initLikeStatus={isLiked}
              count={likeCount}
            ></HeartButton>
            <Text hidden={true}>Реплика</Text>
          </HStack>
        </VStack>
      </Box>
      <Box px={2}>
        <IconButton
          icon={<ThreeDotsVertical />}
          isRound={true}
          variant="outline"
          colorScheme={'gray'}
          aria-label={'Опции'}
        />
      </Box>
    </Flex>
  );
};

export default Comment;
