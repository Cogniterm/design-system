<script setup lang="ts">
// origin: custom — 상세 화면의 표 (콘솔 .jtw > .jt 그대로). 줄 46 · 머리 38 · 면 없는 머리
// 목록 화면의 큰 표(정렬 · 선택 · 쪽 넘김)는 DsDataTable 입니다 — 이건 상세 안에 놓는 작은 표
export interface DetailColumn {
  key: string
  label: string
  /** 숫자 열은 오른쪽 — 머리와 칸이 함께 갑니다 */
  align?: 'left' | 'right'
}
defineProps<{
  columns: DetailColumn[]
  rows: Record<string, unknown>[]
  /** 줄을 구분하는 키 — 없으면 순번 */
  rowKey?: string
}>()
</script>

<template>
  <div class="jtw">
    <table class="jt">
      <thead>
        <tr><th v-for="c in columns" :key="c.key" :class="c.align === 'right' && 'num--right'">{{ c.label }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in rows" :key="rowKey ? String(r[rowKey]) : i">
          <td v-for="c in columns" :key="c.key" :class="c.align === 'right' && 'num--right'">
            <slot :name="c.key" :row="r" :value="r[c.key]">{{ r[c.key] ?? '—' }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
