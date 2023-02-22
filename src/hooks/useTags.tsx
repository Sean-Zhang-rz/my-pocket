import { TagDTO, TagResult } from '@/api/types/tags';
import { Result } from '@/config/request';
import { useEffect, useRef } from 'react';

const useTags = (fetch: (page: number) => Promise<Result<TagResult>>) => {
  const page = useRef<number>(0);
  const hasMore = useRef<boolean>(false);
  const tags = useRef<TagDTO[]>([]);
  const getTagList = async () => {
    const {
      data: { tagList, pager },
    } = await fetch(page.current);

    tags.current.push(...tagList);
    hasMore.current = (pager.page - 1) * pager.per_page + tagList.length < pager.count;
    page.current += 1;
  };
  // useEffect(() => {
  getTagList();
  // }, []);
  return {
    page,
    hasMore,
    tags,
    getTagList,
  };
};

export default useTags;
