<template v-if="props.cols.length">
  <tr>
    <template v-for="col in props.cols">
      <th
        :rowspan="col?.children?.length ? 1 : props.maxLevel - col.level + 1"
        :colspan="col?.children?.length || 1"
      >
        {{ col.label }}
      </th>
    </template>
  </tr>
  <template v-for="col in props.cols">
    <DataPreviewTableHeadColumn
      v-if="col.children"
      :cols="col.children"
      :max-level="props.maxLevel"
    />
  </template>
</template>
<script setup lang="ts">
type TableHeadColumn = {
  label: string;
  children?: TableHeadColumn[];
  level: number;
};
type Props = {
  cols: TableHeadColumn[];
  maxLevel: number;
};
const props = withDefaults(defineProps<Props>(), {
  cols: () => [],
  maxLevel: 1,
});
</script>
