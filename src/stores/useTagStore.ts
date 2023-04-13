import create from "zustand";
import { TagDTO } from "@/api/types/tags";
import { getTags } from "@/api/tags";
import { onError } from "@/utils/onError";

interface TagProps {
  page: number;
  hasMore: boolean;
  tagList: TagDTO[];
  getTagList: (props:{kind: string, page: number}) => Promise<void> 
}
const useTagStore = create<TagProps>((set) => ({
  page: 1,
  hasMore: false,
  tagList: [],

  async getTagList ({kind, page}) {
    console.log('page', page);
    
    const {
      data: { tagList, pager },
    } = await getTags({ kind, page }).catch(onError);

    set({
      page: +pager.page + 1,
      hasMore: (+pager.page - 1) * pager.per_page + tagList.length < pager.count,
      tagList,
    })
  },
}))
export default useTagStore