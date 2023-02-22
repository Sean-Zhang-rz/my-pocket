import { FC, TouchEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTags } from '@/api/tags';
import { Button, Icon } from '@/Components/';
import useTags from '@/hooks/useTags';
import { onError } from '@/utils/onError';
import { TagDTO } from '@/api/types/tags';

import styles from './index.module.scss';

interface TagsProps {
  kind: string;
  selected: string;
  onSelect: (tag_id: string) => void;
}

export const Tags: FC<TagsProps> = (props) => {
  const nav = useNavigate();
  const {
    tags: tagList,
    hasMore,
    getTagList,
  } = useTags((p) => getTags({ kind: props.kind, page: p + 1 }).catch(onError));
  const addNewTag = () => {
    nav(`/tags/create?kind=${props.kind}`);
  };
  const timer = useRef<NodeJS.Timeout>();
  const currentTag = useRef<HTMLDivElement>();
  const onLongPress = (id: string) => {
    nav(`/tags/${id}/edit?kind=${props.kind}`);
  };
  const onTouchStart = (e: TouchEvent<HTMLDivElement>, tag: TagDTO) => {
    currentTag.current = e.currentTarget as HTMLDivElement;
    timer.current = setTimeout(() => {
      onLongPress(tag.id!);
    }, 1000);
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    clearTimeout(timer.current);
  };
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    if (currentTag.current !== pointedElement && !currentTag.current?.contains(pointedElement)) {
      clearTimeout(timer.current);
    }
  };
  return (
    <>
      <div className={styles.main} onTouchMove={onTouchMove}>
        <div className={styles.tag} onClick={addNewTag}>
          <div className={styles.sign}>
            <Icon name="add" className={styles.createTag} />
          </div>
          <div className={styles.name}>新增</div>
        </div>
        {tagList.current.map((tag) => (
          <div
            className={[styles.tag, props.selected === tag.id ? styles.selected : ''].join(' ')}
            onClick={() => props.onSelect(tag.id!)}
            onTouchStart={(e) => onTouchStart(e, tag)}
            onTouchEnd={onTouchEnd}
          >
            <div className={styles.sign}>{tag.sign}</div>
            <div className={styles.name}>{tag.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.loadMore}>
        {hasMore.current && tagList.current.length ? (
          <Button onClick={getTagList}>加载更多</Button>
        ) : (
          <span>没有更多了</span>
        )}
      </div>
    </>
  );
};

export default Tags;
