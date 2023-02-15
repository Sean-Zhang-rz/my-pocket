import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItems } from "@/api/item";
import { ItemCreateDTO } from "@/api/types/items";
import { MainLayout, Tab, Tabs } from "@/Components";
import { onError } from "@/utils/onError";
import Tags from "./Tags";

import styles from './index.module.scss'

const ItemCreate: FC = () => {
  const [formData] = useState<ItemCreateDTO>({
    kind: 'expenses',
    tag_id: '',
    amount: 0,
    happen_at: new Date().toISOString(),
  });
  const nav = useNavigate();
  const onSelected = () => {

  }
  const onSubmit = async () => {
    if (!formData.tag_id || !formData.amount) return;
    await createItems({
      ...formData,
      tag_ids: [formData.tag_id],
    }).catch(onError);
    nav('/items');
  };
  return (
    <MainLayout title="记一笔">
      <div className={styles.wrapper}>
        <Tabs selected={formData.kind} className={styles.tabs} onSelected={onSelected}>
          <Tab id="expenses" name="支出" className={styles.tags_wrapper}>
            <Tags v-model:selected={formData.tag_id} kind="expenses" key="expenses" />
          </Tab>
          <Tab id="income" name="收入" className={styles.tags_wrapper}>
            <Tags v-model:selected={formData.tag_id} kind="income" key="income" />
          </Tab>
        </Tabs>
        <div className={styles.inputPad_wrapper}>
          {/* <InputPad
            v-model:happenAt={formData.happen_at}
            v-model:amount={formData.amount}
            onSubmit={onSubmit}
          /> */}
        </div>
      </div>
    </MainLayout>
  );
}

export default ItemCreate;