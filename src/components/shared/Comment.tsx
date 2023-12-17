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
import { useEffect, useState } from 'react';
import PlantsApi from '@/apis/plants-api';
import ArticlesApi from '@/apis/blog-api';
import { CommentUserInfo } from '@/data/interfaces/comment-user-info';

type CommentProps = {
  id: string;
  user?: CommentUserInfo;
  content: string;
  date: Date;
  isLiked: boolean;
  likeCount: number;
  isPlantComment: boolean;
};

const Comment = ({
  id,
  user,
  content,
  date,
  isLiked,
  likeCount,
  isPlantComment,
}: CommentProps) => {
  const [isHearted, setIsHearted] = useState(isLiked);
  const [likeNum, setLikeNum] = useState(likeCount);

  useEffect(() => {
    setLikeNum(likeCount);
  }, [likeCount]);

  const handleHeartClick = async (commentId: string) => {
    setIsHearted(!isHearted);
    if (isPlantComment) {
      if (!isHearted) {
        setLikeNum(++likeCount);
        await PlantsApi.likeComment(commentId);
      } else {
        setLikeNum(--likeCount);
        await PlantsApi.unlikeComment(commentId);
      }
    } else {
      if (!isHearted) {
        setLikeNum(++likeCount);
        await ArticlesApi.likeComment(commentId);
      } else {
        setLikeNum(likeCount);
        await ArticlesApi.unlikeComment(commentId);
      }
    }
  };

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
              tooltipLabel="Ми се допаѓа"
              handleHeartClick={() => handleHeartClick(id)}
              isActive={isHearted}
              count={likeNum}
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
