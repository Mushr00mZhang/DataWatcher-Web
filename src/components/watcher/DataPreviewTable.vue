<template>
  <table class="watcher-data-preview-table">
    <thead>
      <DataPreviewTableHeadColumn :cols="cols" :max-level="maxLevel" />
    </thead>
    <tbody>
      <template v-for="row in flattedDatas">
        <tr>
          <template v-for="col in row">
            <td>
              {{ col }}
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { IDataDto } from '@/models/watcher';
import { computed } from 'vue';
import DataPreviewTableHeadColumn from '@/components/watcher/DataPreviewTableHeadColumn.vue';
type Props = {
  datas: IDataDto[];
};
const props = withDefaults(defineProps<Props>(), { datas: () => [] });

const cols = computed(() => {
  const Extend = props.datas?.[0]?.Extend || {};
  const extendCols = parseExtendCols(Extend, 1);
  return [
    { prop: '@timestamp', label: '时间戳', level: 0 },
    { prop: 'Expire1Day', label: '呆滞一天', level: 0 },
    { prop: 'Expire1Week', label: '呆滞一周', level: 0 },
    { prop: 'Expire1Month', label: '呆滞一月', level: 0 },
    { prop: 'Extend', label: '扩展数据', level: 0, children: extendCols },
  ] as TableColumn<IDataDto, keyof IDataDto>[];
});
const maxLevel = computed(() => getMaxLevel(cols.value));
const flattedDatas = computed(() => props.datas.map((d) => flatDatas(cols.value, d)));
export type TableColumn<T extends Object, K extends keyof T> = {
  prop: K;
  label: string;
  level: number;
  children: T[K] extends Object ? TableColumn<T[K], keyof T[K]>[] : never;
};
const parseExtendCols = <T extends Object, K extends keyof T>(
  extend: T,
  level: number
): TableColumn<T, K>[] => {
  return (Object.keys(extend) as (keyof T)[]).map(
    (prop) =>
      ({
        prop,
        label: prop,
        level,
        children:
          extend[prop] instanceof Object
            ? parseExtendCols(extend[prop] as T[K] & Object, level + 1)
            : undefined,
      } as TableColumn<T, K>)
  );
};
interface ITree {
  prop: string | number | symbol;
  label: string;
  level: number;
  children?: ITree[];
}
const getMaxLevel = (cols: ITree[]): number => {
  return Math.max(...(cols?.map((c) => Math.max(c.level, getMaxLevel(c?.children || []))) || [0]));
};
const flatDatas = (cols: ITree[], data: Object): any[] => {
  return cols.flatMap((c) =>
    c.children instanceof Array && c.children.length
      ? flatDatas(c.children, data[c.prop as keyof typeof data])
      : [data[c.prop as keyof typeof data]]
  );
};
</script>
<style lang="scss" scoped>
thead {
  :deep(th) {
    padding: 4px 8px;
    line-height: 1;
    text-wrap: nowrap;
  }
}
tbody {
  :deep(td) {
    padding: 4px 0;
    line-height: 1;
    text-wrap: nowrap;
  }
}
</style>
