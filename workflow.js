/* ============================================
   handover.js — 워크플로우 문서
   ============================================
   전제: 이 업무(코드로 화면을 만들어 코드로 넘기는 디자인)를 하던 사람이
   떠나고, 다른 사람이 이어받습니다. 디자인 시스템 자체를 고치는 권한은
   그대로 두고, 그 시스템으로 화면을 만드는 일만 넘깁니다.

   문서 사이트의 Docs → 워크플로우 페이지가 이 파일 하나를 씁니다.
   설치 명령·설정 파일 내용은 examples/vuetify-app의 실제 값과 같아야 합니다.
   버전을 올리면 SETUP의 표와 프롬프트를 함께 고치세요. */

/* 실제로 쓰는 버전 — examples/vuetify-app/package.json과 같은 값입니다 */
export const DEPS = [
  ['vue', '^3.5.13', '화면을 만드는 프레임워크', '필수'],
  ['vuetify', '3.11.6', '컴포넌트 66종 중 31종의 바탕. 버전을 고정합니다', '필수'],
  ['@lucide/vue', '^1.34.0', '아이콘. Vuetify 내부 아이콘도 이걸로 갈아끼웁니다', '필수'],
  ['pretendard', '^1.3.9', '본문 글꼴. 한글·영문·숫자가 한 벌로 어울립니다', '필수'],
  ['vite', '^6.0.7', '개발 서버와 빌드', '개발용'],
  ['@vitejs/plugin-vue', '^5.2.1', 'Vite가 .vue 파일을 읽게 합니다', '개발용'],
  ['vite-plugin-vuetify', '^2.1.0', '쓴 컴포넌트만 골라 넣습니다(트리셰이킹)', '개발용'],
  ['typescript', '^5.7.0', '타입', '개발용'],
  ['vue-tsc', '^2.2.0', '.vue 파일 타입 검사', '개발용'],
]

/* AI에게 통째로 시키는 프롬프트 — 복사 버튼이 이 문자열을 넘깁니다 */
export const SETUP_PROMPT = `# Cogniterm Design System — 개발 환경 세팅

너는 이 저장소를 처음 받은 사람의 컴퓨터에서, 아래 환경을 처음부터 끝까지
만들어 줘야 한다. 각 단계가 끝날 때마다 실제로 실행해서 확인하고,
실패하면 원인을 말하고 고친 뒤 다음으로 넘어가라.

## 전제
- Node.js 20 이상이 설치돼 있다. (없으면 먼저 안내할 것)
- 디자인 시스템 저장소를 이미 내려받았다. 그 경로를 <DS>라고 부른다.

## 1. 프로젝트 만들기
새 Vite + Vue + TypeScript 프로젝트를 만든다.

    npm create vite@latest my-app -- --template vue-ts
    cd my-app

## 2. 의존성 설치
    npm i vue vuetify@3.11.6 @lucide/vue pretendard
    npm i -D vite @vitejs/plugin-vue vite-plugin-vuetify typescript vue-tsc

vuetify는 3.11.6으로 고정한다. 마이너 버전이 올라가면 내부 클래스 이름이
바뀌어 디자인 시스템의 덮어쓰기 규칙이 깨진 적이 있다.

## 3. 디자인 시스템 파일 복사
    cp -r <DS>/vue/            src/design/
    cp    <DS>/ds.css          src/design/
    cp    <DS>/ds-vuetify.css  src/design/

vue 뒤의 슬래시를 빼면 src/design/vue/ 로 한 단계 더 들어간다. 주의할 것.
이 폴더는 "받아서 쓰는" 사본이다. 직접 고치지 말고, 고쳐야 하면
디자인 시스템 저장소에 요청한다.

## 4. 별칭을 두 곳에 넣는다
한쪽만 넣으면 개발 서버는 뜨는데 타입 검사에서 모듈을 못 찾는다.

vite.config.ts:
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import vuetify from 'vite-plugin-vuetify'
    import { fileURLToPath, URL } from 'node:url'

    export default defineConfig({
      // styles: 'none' — 컴포넌트별 CSS 자동 주입을 끈다. 5번 참고.
      plugins: [vue(), vuetify({ autoImport: true, styles: 'none' })],
      resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
    })

tsconfig.json의 compilerOptions에:
    "baseUrl": ".",
    "paths": { "~/*": ["./src/*"] }

## 5. Vuetify 스타일을 레이어로 감싼다
src/vuetify-layer.css 를 만들고 한 줄만 넣는다.

    @import 'vuetify/dist/vuetify.css' layer(vuetify);

이유: 레이어에 넣지 않으면 "선택자 무게가 같을 때 누가 이기는가"를 파일
순서가 정한다. Vuetify CSS가 우리 CSS보다 뒤에 실리는 일이 잦아서, 포커스
테두리·드롭다운 그림자 같은 것이 우리 값으로 안 바뀐다. 레이어에 넣으면
레이어 밖(unlayered) 선언인 우리 CSS가 항상 이긴다.

'vuetify/styles'가 아니라 'vuetify/dist/vuetify.css'여야 한다. 앞의 것은
기본·유틸만 담고 있어 컴포넌트가 통째로 무너진다.

## 6. main.ts
    import { createApp } from 'vue'
    import { createVuetify } from 'vuetify'
    import './vuetify-layer.css'
    import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
    import { dsTheme } from '~/design/theme'
    import { dsDefaults } from '~/design/defaults'
    import { lucideIconSet } from '~/design/vuetify-icons'
    import { dsLocale, dsDate } from '~/design/locale'
    import '~/design/ds.css'
    import '~/design/ds-vuetify.css'
    import App from './App.vue'

    createApp(App)
      .use(createVuetify({
        theme: dsTheme,
        defaults: dsDefaults as any,
        icons: lucideIconSet as any,   // 빠뜨리면 내부 아이콘이 전부 빈 네모가 된다
        locale: dsLocale as any,       // 빠뜨리면 달력 요일이 S M T W T F S로 남는다
        date: dsDate as any,
      }))
      .mount('#app')

## 7. 동작 확인
App.vue를 아래로 바꾸고 npm run dev 로 띄운다.

    <script setup lang="ts">
    import { ref } from 'vue'
    import { DsButton, DsInput } from '~/design'
    import { DsSelect } from '~/design/vuetify'
    const q = ref(''); const v = ref('실행 중')
    </script>
    <template>
      <div style="padding:24px;display:flex;flex-direction:column;gap:16px;max-width:320px">
        <DsInput v-model="q" label="검색어" placeholder="입력하세요" />
        <DsSelect v-model="v" label="상태" :items="['대기','실행 중','완료']" />
        <DsButton variant="primary">저장</DsButton>
      </div>
    </template>

확인할 것:
- 버튼이 파란 면(#1F7FF0)으로 나오는가
- 셀렉트를 눌렀을 때 목록이 모서리 8px에 그림자와 함께 뜨는가
- 글꼴이 Pretendard인가 (한글 자간이 촘촘하면 맞다)
- npx vue-tsc --noEmit 가 통과하는가

## 8. 마지막으로
- <DS>/llms.txt 를 읽고 무엇이 어디 있는지 파악해라.
- 컴포넌트를 쓸 때는 <DS>/components/llms.txt 를 먼저 읽어라.
- 화면 전체를 짤 때는 <DS>/patterns/llms.txt 를 읽어라.

세팅이 끝나면 각 단계의 확인 결과를 표로 정리해서 보고해라.`

export function pageWorkflow(ic) {
  const dep = (only) => DEPS.filter((d) => d[3] === only)
    .map(([n, v, why]) => `<tr><td><code>${n}</code></td><td><code>${v}</code></td><td>${why}</td></tr>`).join('')

  return `
    <div class="page-head"><h1>워크플로우</h1></div>
    <p class="page-lead">
      코드로 화면을 만들어 코드로 넘기는 일을 이어받는 사람을 위한 문서입니다.
      환경 세팅부터 매일의 작업 순서, 막혔을 때 볼 곳까지 한 번에 담았습니다.
    </p>

    <div class="prose">
      <h2>이 문서를 읽는 두 사람</h2>
      <p>
        같은 환경을 쓰지만 하는 일이 다릅니다. 아래에서 자기 쪽만 따라가면 됩니다.
      </p>
      <table>
        <thead><tr><th>읽는 사람</th><th>하는 일</th><th>어디까지 읽나</th></tr></thead>
        <tbody>
          <tr>
            <td><b>디자인을 이어받는 사람</b></td>
            <td>화면을 코드로 만들어 개발팀에 넘깁니다. 시안 대신 도는 화면을 줍니다.</td>
            <td>끝까지</td>
          </tr>
          <tr>
            <td><b>개발자</b></td>
            <td>넘겨받은 화면을 제품에 붙이고 고칩니다.</td>
            <td>1 · 2 · 6장</td>
          </tr>
        </tbody>
      </table>

      <h2>1. 무엇을 넘기고 무엇을 넘기지 않나</h2>
      <p>
        넘기는 것은 <b>이 시스템으로 화면을 만드는 일</b>입니다.
        시스템 자체를 고치는 일은 넘기지 않습니다. 이 경계가 흐려지면
        사람마다 다른 버튼이 생기고, 그 순간 디자인 시스템은 의미를 잃습니다.
      </p>
      <table>
        <thead><tr><th>일</th><th>누가</th><th>어디를 고치나</th></tr></thead>
        <tbody>
          <tr>
            <td>화면 만들기 · 화면 안에서 조합하기</td>
            <td>이어받는 사람 · 개발자</td>
            <td>각자 프로젝트의 <code>src/</code></td>
          </tr>
          <tr>
            <td>컴포넌트 추가 · 색과 여백 바꾸기 · 규칙 바꾸기</td>
            <td><b>관리 권한이 있는 사람만</b></td>
            <td>디자인 시스템 저장소</td>
          </tr>
        </tbody>
      </table>
      <p>
        각 프로젝트의 <code>src/design/</code>은 <b>받아서 쓰는 사본</b>입니다.
        여기를 직접 고치면 다음에 시스템을 갱신할 때 조용히 덮어써집니다.
        고쳐야 할 것이 보이면 5장의 절차를 따르세요.
      </p>

      <h2>2. 30분 안에 첫 화면 띄우기</h2>
      <p>
        아래 프롬프트를 AI 코딩 도구(Claude Code · Cursor 등)에 그대로 붙여넣으면
        프로젝트 생성부터 동작 확인까지 한 번에 진행합니다.
        디자인 시스템 저장소를 먼저 내려받고, 그 경로를 <code>&lt;DS&gt;</code>에 넣으세요.
      </p>
      <div class="ho-prompt">
        <div class="ho-prompt-head">
          <span>세팅 프롬프트</span>
          <button class="btn btn-secondary btn-sm" id="hoCopy">${ic('copy', 'sm')} 복사</button>
        </div>
        <pre id="hoPrompt"><code>${SETUP_PROMPT.replace(/[<>&]/g, (m) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]))}</code></pre>
      </div>
      <p>
        AI 없이 수동으로 하겠다면 3장을 순서대로 따라가면 됩니다. 내용은 같습니다.
      </p>

      <h2>3. 수동으로 세팅하기</h2>

      <h3>3-1. 먼저 있어야 하는 것</h3>
      <table>
        <thead><tr><th>이름</th><th>버전</th><th>확인</th></tr></thead>
        <tbody>
          <tr><td>Node.js</td><td>20 이상</td><td><code>node -v</code></td></tr>
          <tr><td>Git</td><td>—</td><td><code>git --version</code></td></tr>
          <tr><td>편집기</td><td>VS Code 권장</td><td>확장: Vue (Official)</td></tr>
        </tbody>
      </table>

      <h3>3-2. 프로젝트 만들기</h3>
      <pre><code>npm create vite@latest my-app -- --template vue-ts
cd my-app</code></pre>

      <h3>3-3. 설치 — 무엇을 왜 넣나</h3>
      <p>제품에 함께 실려 나가는 것들입니다.</p>
      <pre><code>npm i vue vuetify@3.11.6 @lucide/vue pretendard</code></pre>
      <table>
        <thead><tr><th>패키지</th><th>버전</th><th>왜 필요한가</th></tr></thead>
        <tbody>${dep('필수')}</tbody>
      </table>
      <p>
        <code>vuetify</code>만 <code>^</code> 없이 못박습니다.
        마이너 버전이 올라가면 내부 클래스 이름이 바뀌어, 디자인 시스템이
        덮어쓰던 규칙이 조용히 안 먹는 일이 있었습니다.
      </p>
      <p>개발할 때만 쓰고 제품에는 실리지 않는 것들입니다.</p>
      <pre><code>npm i -D vite @vitejs/plugin-vue vite-plugin-vuetify typescript vue-tsc</code></pre>
      <table>
        <thead><tr><th>패키지</th><th>버전</th><th>왜 필요한가</th></tr></thead>
        <tbody>${dep('개발용')}</tbody>
      </table>

      <h3>3-4. 디자인 시스템 파일 복사</h3>
      <pre><code>cp -r &lt;DS&gt;/vue/            src/design/
cp    &lt;DS&gt;/ds.css          src/design/
cp    &lt;DS&gt;/ds-vuetify.css  src/design/</code></pre>
      <p>
        <code>vue</code> 뒤의 슬래시가 중요합니다. 빼면
        <code>src/design/vue/</code>로 한 단계 더 들어가 경로가 전부 어긋납니다.
      </p>

      <h3>3-5. 별칭을 두 곳에 — 한 곳만 하면 반만 됩니다</h3>
      <p>
        Vite와 TypeScript는 서로의 설정을 읽지 않습니다.
        Vite에만 넣으면 개발 서버는 뜨는데 타입 검사가
        <code>Cannot find module '~/design'</code>으로 멈춥니다.
      </p>
      <pre><code>// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true, styles: 'none' })],
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})</code></pre>
      <pre><code>// tsconfig.json — compilerOptions 안에
"baseUrl": ".",
"paths": { "~/*": ["./src/*"] }</code></pre>

      <h3>3-6. Vuetify 스타일을 레이어로 감싸기</h3>
      <p>
        <code>src/vuetify-layer.css</code>를 만들고 한 줄만 넣습니다.
      </p>
      <pre><code>@import 'vuetify/dist/vuetify.css' layer(vuetify);</code></pre>
      <p>
        선택자 무게가 같을 때 누가 이기는지는 파일 순서가 정합니다.
        <code>vite-plugin-vuetify</code>는 컴포넌트 CSS를 그 컴포넌트가
        불릴 때 끼워 넣기 때문에 우리 CSS보다 뒤에 오는 일이 잦고,
        그때마다 Vuetify가 이겼습니다. 레이어에 넣으면 순서와 무관하게
        <b>레이어 밖 선언인 우리 CSS가 항상 이깁니다.</b>
      </p>
      <p>
        두 가지를 주의합니다. <code>'vuetify/styles'</code>가 아니라
        <code>'vuetify/dist/vuetify.css'</code>여야 합니다 — 앞의 것은
        기본·유틸만 담고 있어 컴포넌트가 통째로 무너집니다. 그리고
        <code>styles: 'none'</code>을 빼면 주입된 CSS가 레이어 밖에 남아
        같은 문제가 되돌아옵니다.
      </p>

      <h3>3-7. main.ts</h3>
      <pre><code>import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import './vuetify-layer.css'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import { lucideIconSet } from '~/design/vuetify-icons'
import { dsLocale, dsDate } from '~/design/locale'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'
import App from './App.vue'

createApp(App)
  .use(createVuetify({
    theme: dsTheme,
    defaults: dsDefaults as any,
    icons: lucideIconSet as any,
    locale: dsLocale as any,
    date: dsDate as any,
  }))
  .mount('#app')</code></pre>
      <table>
        <thead><tr><th>빠뜨리면</th><th>이렇게 됩니다</th></tr></thead>
        <tbody>
          <tr><td><code>icons</code></td><td>체크박스·화살표 등 내부 아이콘이 전부 빈 네모</td></tr>
          <tr><td><code>locale</code> · <code>date</code></td><td>달력 요일이 S M T W T F S, 페이지네이션 안내가 영어</td></tr>
          <tr><td><code>theme</code></td><td>Vuetify 기본 보라색이 그대로 나옴</td></tr>
          <tr><td><code>ds-vuetify.css</code></td><td>Vuetify 기반 31종이 머티리얼 모습 그대로</td></tr>
        </tbody>
      </table>

      <h3>3-8. 동작 확인</h3>
      <pre><code>npm run dev</code></pre>
      <p>화면에 아래 네 가지가 맞는지 봅니다. 하나라도 어긋나면 6장을 보세요.</p>
      <table>
        <thead><tr><th>확인</th><th>맞는 모습</th></tr></thead>
        <tbody>
          <tr><td>버튼 색</td><td>브랜드 파랑 <code>#1F7FF0</code></td></tr>
          <tr><td>셀렉트 드롭다운</td><td>모서리 8px · 그림자 있음 · 항목 높이 34px</td></tr>
          <tr><td>글꼴</td><td>Pretendard (한글 자간이 촘촘함)</td></tr>
          <tr><td>타입 검사</td><td><code>npx vue-tsc --noEmit</code> 통과</td></tr>
        </tbody>
      </table>

      <h2>4. 매일의 작업 순서</h2>
      <p>
        화면 하나를 만드는 순서입니다. 이 순서를 지키면 "만들고 보니
        이미 있는 컴포넌트였다"가 줄어듭니다.
      </p>
      <table>
        <thead><tr><th></th><th>할 일</th><th>어디를 보나</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>비슷한 화면이 이미 있는지 본다</td><td>Templates</td></tr>
          <tr><td>2</td><td>필요한 컴포넌트를 고른다. 비슷한 둘 중 무엇인지 확인한다</td><td>Components — 각 페이지의 "비슷한 것과의 구분"</td></tr>
          <tr><td>3</td><td>색·여백·글자 크기를 직접 정하지 않고 토큰에서 고른다</td><td>Foundation</td></tr>
          <tr><td>4</td><td>문안을 쓴다. 용어는 표에서 고른다</td><td>Foundation → 용어집 · UX 라이팅</td></tr>
          <tr><td>5</td><td>키보드만으로 끝까지 조작해 본다</td><td>각 컴포넌트의 Accessibility 탭</td></tr>
          <tr><td>6</td><td>개발자에게 넘긴다 — 코드 그대로</td><td>—</td></tr>
        </tbody>
      </table>
      <p>
        AI에게 시킬 때는 각 컴포넌트 페이지의 <b>AI 프롬프트 복사</b> 버튼을
        쓰면 그 컴포넌트의 props·주의사항·접근성이 한 덩어리로 복사됩니다.
        화면 전체를 맡길 때는 <code>patterns/llms.txt</code>를 먼저 읽히세요.
      </p>

      <h2>5. 디자인 시스템을 고쳐야 할 때</h2>
      <p>
        화면을 만들다 보면 "이건 시스템에 없네" 하는 순간이 옵니다.
        그때 <code>src/design/</code>을 직접 고치지 말고 아래 순서를 따릅니다.
        직접 고치면 다음 갱신 때 조용히 사라지고, 그 사이에 만든 화면들만
        어긋난 채 남습니다.
      </p>
      <table>
        <thead><tr><th></th><th>할 일</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>정말 없는지 다시 본다. 이름이 달라서 못 찾는 경우가 대부분입니다 (⌘K 검색)</td></tr>
          <tr><td>2</td><td>기존 컴포넌트의 조합으로 되는지 본다. DatePicker가 Input·Menu·Calendar의 조합인 것처럼</td></tr>
          <tr><td>3</td><td>그래도 없으면 관리자에게 요청한다 — 어느 화면에서 · 무엇이 · 왜 필요한지</td></tr>
          <tr><td>4</td><td>답을 기다리는 동안에는 화면 안에서만 임시로 만들고, 나중에 교체할 자리를 주석으로 남긴다</td></tr>
        </tbody>
      </table>
      <p>
        시스템이 갱신되면 <code>src/design/</code>을 통째로 다시 복사합니다
        (3-4장). 그 폴더 밖은 건드리지 않으므로 화면은 그대로 돕니다.
      </p>

      <h2>6. 막혔을 때</h2>
      <p>증상으로 찾습니다. 대부분 설정 한 줄이 빠진 경우입니다.</p>
      <table>
        <thead><tr><th>증상</th><th>원인</th><th>고칠 곳</th></tr></thead>
        <tbody>
          <tr>
            <td>화면이 통째로 스타일 없이 나옴</td>
            <td><code>ds.css</code> 미등록</td>
            <td>3-7 <code>main.ts</code></td>
          </tr>
          <tr>
            <td>체크박스·셀렉트 화살표가 빈 네모</td>
            <td><code>icons</code> 누락</td>
            <td>3-7 <code>createVuetify</code></td>
          </tr>
          <tr>
            <td>Vuetify 기반만 머티리얼 모습</td>
            <td><code>ds-vuetify.css</code> 미등록</td>
            <td>3-7 <code>main.ts</code></td>
          </tr>
          <tr>
            <td>포커스 테두리·그림자가 우리 값이 아님</td>
            <td>레이어 미적용, 또는 <code>styles: 'none'</code> 빠짐</td>
            <td>3-6</td>
          </tr>
          <tr>
            <td><code>Cannot find module '~/design'</code></td>
            <td>별칭을 한 곳에만 넣음</td>
            <td>3-5 두 곳 모두</td>
          </tr>
          <tr>
            <td>직접 쓴 <code>&lt;v-btn&gt;</code>이 비어 나옴</td>
            <td><code>createVuetify</code>는 컴포넌트를 등록하지 않음</td>
            <td><code>vite-plugin-vuetify</code> 확인</td>
          </tr>
          <tr>
            <td>달력 요일이 S M T W T F S</td>
            <td><code>locale</code> · <code>date</code> 누락</td>
            <td>3-7</td>
          </tr>
          <tr>
            <td>컴포넌트가 통째로 무너짐</td>
            <td><code>'vuetify/styles'</code>를 불렀음</td>
            <td>3-6 — <code>dist/vuetify.css</code>로</td>
          </tr>
        </tbody>
      </table>

      <h2>7. 넘겨받은 날 확인할 목록</h2>
      <p>여기까지 모두 예라면 워크플로우는 끝난 것입니다.</p>
      <table>
        <thead><tr><th></th><th>확인</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>디자인 시스템 저장소를 내려받아 열 수 있다</td></tr>
          <tr><td>2</td><td>3장을 따라 새 프로젝트를 만들고 예제 화면이 뜬다</td></tr>
          <tr><td>3</td><td><code>npx vue-tsc --noEmit</code>이 통과한다</td></tr>
          <tr><td>4</td><td>이 문서 3-8의 네 가지 확인이 모두 맞다</td></tr>
          <tr><td>5</td><td>컴포넌트 페이지에서 AI 프롬프트를 복사해 화면 하나를 만들어 봤다</td></tr>
          <tr><td>6</td><td>시스템을 고쳐야 할 때 누구에게 요청하는지 안다</td></tr>
          <tr><td>7</td><td>Templates에 있는 예제 화면을 하나 열어 봤다</td></tr>
        </tbody>
      </table>
    </div>`
}

/* ═══════════════════════════════════════════════════════════
   빠른 시작 — 명령 한 덩어리로 끝내고 싶은 사람용
   ═══════════════════════════════════════════════════════════
   Carbon·Astryx·Polaris 모두 "Get started"와 별도로 "Quick start"를
   두고 있습니다. 읽을 시간이 없는 사람이 붙여넣고 확인만 하게 하는 자리입니다. */
export const QUICK_INSTALL = `# 1. 프로젝트 만들기
npm create vite@latest my-app -- --template vue-ts && cd my-app

# 2. 한 번에 설치 (제품에 실리는 것 + 개발 도구)
npm i vue vuetify@3.11.6 @lucide/vue pretendard
npm i -D vite @vitejs/plugin-vue vite-plugin-vuetify typescript vue-tsc

# 3. 디자인 시스템 복사 (<DS> = 디자인 시스템 저장소 경로)
cp -r <DS>/vue/ src/design/ && cp <DS>/ds.css <DS>/ds-vuetify.css src/design/

# 4. 실행
npm run dev`

export function pageQuickstart(ic) {
  return `
    <div class="page-head"><h1>빠른 시작</h1></div>
    <p class="page-lead">
      두 갈래입니다. 아무것도 설치돼 있지 않다면 <b>한 줄</b>로 끝내고,
      Node.js가 이미 있다면 아래 명령을 순서대로 실행하세요.
      왜 이렇게 하는지는 <a href="#/docs/env">개발 환경</a>과
      <a href="#/docs/workflow">워크플로우</a>에 있습니다.
    </p>

    <div class="prose">
      <h2>A · 완전 처음이라면 — 한 줄</h2>
      <p>
        <b>VS Code 말고는 아무것도 없어도 됩니다.</b> Node.js가 없으면 설치하고,
        Git이 없어도 되고, 프로젝트 생성·패키지 설치·설정 파일·화면 띄우기까지
        한 번에 끝냅니다. VS Code에서 터미널을 열고(<code>Ctrl</code> +
        <code>&#96;</code>) 자기 운영체제 줄을 붙여넣으세요.
      </p>
      <h3>Windows</h3>
      <pre><code>irm https://Cogniterm.github.io/design-system/setup/setup.ps1 -OutFile setup.ps1
powershell -ExecutionPolicy Bypass -File .setup.ps1</code></pre>
      <h3>macOS · Linux</h3>
      <pre><code>curl -fsSL https://Cogniterm.github.io/design-system/setup/setup.sh | bash</code></pre>
      <p>
        7단계가 차례로 지나가고 마지막에 브라우저가 열립니다. 3~5분 걸립니다.
        폴더 이름은 <code>my-app</code>입니다 — 바꾸려면 실행 전에
        <code>$env:DS_APP_NAME='이름'</code>(Windows) 또는
        <code>DS_APP_NAME=이름</code>(macOS)을 지정하세요.
      </p>
      <table>
        <thead><tr><th>단계</th><th>하는 일</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Node.js 확인 — 없으면 winget · Homebrew로 설치</td></tr>
          <tr><td>2</td><td>디자인 시스템 내려받기 (Git 없이 압축본으로)</td></tr>
          <tr><td>3</td><td>Vite + Vue + TypeScript 프로젝트 생성</td></tr>
          <tr><td>4</td><td>패키지 9종 설치</td></tr>
          <tr><td>5</td><td>디자인 시스템 파일을 <code>src/design/</code>에 복사</td></tr>
          <tr><td>6</td><td>설정 파일 5개 넣기</td></tr>
          <tr><td>7</td><td>개발 서버 실행</td></tr>
        </tbody>
      </table>
      <p>
        같은 이름의 폴더가 이미 있으면 아무것도 하지 않고 멈춥니다 —
        기존 작업물을 덮어쓰지 않습니다.
      </p>

      <h2>B · Node.js가 이미 있다면 — 수동 설정</h2>
      <p>Node.js 20 이상이 필요합니다. <code>node -v</code>로 확인하세요.</p>

      <h3>1 · 설치</h3>
      <p>네 줄입니다. <code>&lt;DS&gt;</code>에 디자인 시스템 저장소 경로를 넣으세요.</p>
      <pre><code>${QUICK_INSTALL.replace(/[<>&]/g, (m) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]))}</code></pre>

      <h3>2 · 설정 세 곳</h3>
      <p>여기까지 하면 화면이 뜹니다. 한 곳이라도 빠지면 3장의 증상 표를 보세요.</p>
      <pre><code>// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true, styles: 'none' })],
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})</code></pre>
      <pre><code>// tsconfig.json — compilerOptions 안에
"baseUrl": ".",
"paths": { "~/*": ["./src/*"] }</code></pre>
      <pre><code>/* src/vuetify-layer.css — 새로 만듭니다 */
@import 'vuetify/dist/vuetify.css' layer(vuetify);</code></pre>

      <h3>3 · main.ts</h3>
      <pre><code>import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import './vuetify-layer.css'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import { lucideIconSet } from '~/design/vuetify-icons'
import { dsLocale, dsDate } from '~/design/locale'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'
import App from './App.vue'

createApp(App)
  .use(createVuetify({
    theme: dsTheme, defaults: dsDefaults as any,
    icons: lucideIconSet as any, locale: dsLocale as any, date: dsDate as any,
  }))
  .mount('#app')</code></pre>

      <h2>됐는지 확인</h2>
      <table>
        <thead><tr><th>확인</th><th>맞는 모습</th></tr></thead>
        <tbody>
          <tr><td>버튼 색</td><td>브랜드 파랑 <code>#1F7FF0</code></td></tr>
          <tr><td>셀렉트 드롭다운</td><td>모서리 8px · 그림자 있음 · 항목 높이 34px</td></tr>
          <tr><td>글꼴</td><td>Pretendard</td></tr>
          <tr><td>타입</td><td><code>npx vue-tsc --noEmit</code> 통과</td></tr>
        </tbody>
      </table>
      <p>
        AI 도구에 통째로 맡기려면 <a href="#/docs/workflow">워크플로우</a>의
        세팅 프롬프트를 복사해 붙여넣으세요. 위 내용을 단계마다 확인하며 진행합니다.
      </p>
    </div>`
}

/* ═══════════════════════════════════════════════════════════
   개발 환경 — 무엇 위에서 도는가
   ═══════════════════════════════════════════════════════════
   "이게 무슨 도구로 만든 건가"라는 오해를 없애는 자리입니다.
   Figma 파일이 아니라 도는 코드라는 점, 그래서 개발팀과 같은 것을 쓴다는 점. */
export function pageEnv(ic) {
  const row = ([n, v, why]) =>
    `<tr><td><code>${n}</code></td><td><code>${v}</code></td><td>${why}</td></tr>`

  return `
    <div class="page-head"><h1>개발 환경</h1></div>
    <p class="page-lead">
      이 디자인 시스템은 그림 파일이 아니라 <b>실제로 도는 코드</b>입니다.
      디자인과 개발이 같은 것을 씁니다 — 그래서 넘길 때 옮겨 그릴 것이 없습니다.
    </p>

    <div class="prose">
      <h2>한 줄 요약</h2>
      <p>
        <b>Vue 3 + Vuetify 3 + Vite</b> 위에서 돕니다.
        컴포넌트 66종 중 35종은 우리가 직접 만들었고(Standalone),
        31종은 Vuetify를 감싼 것입니다(Vuetify 기반).
        직접 만든 35종은 Vuetify 없이도 돕니다.
      </p>

      <h2>왜 이 조합인가</h2>
      <table>
        <thead><tr><th>고른 것</th><th>이유</th></tr></thead>
        <tbody>
          <tr>
            <td><b>Vue 3</b></td>
            <td>제품 프런트엔드가 Vue입니다. 디자인이 다른 프레임워크를 쓰면 넘길 때 다시 만들어야 합니다.</td>
          </tr>
          <tr>
            <td><b>Vuetify 3</b></td>
            <td>달력·드롭다운 위치 계산·키보드 이동·한글 조합 입력처럼 직접 만들면 오래 걸리고 자주 틀리는 것들을 가져다 씁니다. 대신 생김새는 전부 우리 값으로 덮습니다.</td>
          </tr>
          <tr>
            <td><b>Vite</b></td>
            <td>고치면 바로 화면에 반영됩니다. 디자인을 만지면서 확인하는 일이 잦아 이 속도가 중요합니다.</td>
          </tr>
          <tr>
            <td><b>Lucide</b></td>
            <td>아이콘. Vuetify 내부 아이콘(체크·화살표)까지 같은 것으로 갈아끼워 두 벌이 섞이지 않게 합니다.</td>
          </tr>
          <tr>
            <td><b>Pretendard</b></td>
            <td>한글·영문·숫자가 한 벌로 어울리는 본문 글꼴. 섞어 쓰면 숫자만 튀어 보입니다.</td>
          </tr>
        </tbody>
      </table>

      <h2>넘기는 것은 무엇인가</h2>
      <p>
        시안이 아니라 <b>도는 화면과 그 코드</b>를 넘깁니다.
        개발자는 받은 코드를 제품에 붙이고, 데이터를 연결하고, 상태를 잇습니다.
        색·여백·글자 크기를 다시 재거나 옮겨 그릴 일이 없습니다.
      </p>
      <table>
        <thead><tr><th>흔한 방식</th><th>여기서는</th></tr></thead>
        <tbody>
          <tr><td>시안 이미지를 넘기고 개발자가 다시 만든다</td><td>도는 코드를 그대로 넘긴다</td></tr>
          <tr><td>간격·색을 개발자가 눈으로 재서 맞춘다</td><td>토큰 이름이 코드에 이미 들어 있다</td></tr>
          <tr><td>상호작용은 말로 설명한다</td><td>눌러 보면 그대로 동작한다</td></tr>
        </tbody>
      </table>

      <h2>패키지 목록</h2>
      <p>제품에 함께 실려 나갑니다.</p>
      <table>
        <thead><tr><th>패키지</th><th>버전</th><th>맡은 일</th></tr></thead>
        <tbody>${DEPS.filter((d) => d[3] === '필수').map(row).join('')}</tbody>
      </table>
      <p>개발할 때만 쓰고 제품에는 실리지 않습니다.</p>
      <table>
        <thead><tr><th>패키지</th><th>버전</th><th>맡은 일</th></tr></thead>
        <tbody>${DEPS.filter((d) => d[3] === '개발용').map(row).join('')}</tbody>
      </table>
      <p>
        <code>vuetify</code>만 <code>^</code> 없이 못박습니다.
        마이너 버전이 올라가면 내부 클래스 이름이 바뀌어,
        우리가 덮어쓰던 규칙이 조용히 안 먹은 적이 있습니다.
      </p>

      <h2>파일이 어디에 놓이는가</h2>
      <pre><code>my-app/
├─ src/
│  ├─ design/          ← 디자인 시스템 사본. 직접 고치지 않습니다
│  │  ├─ ds.css            토큰과 Standalone 컴포넌트
│  │  ├─ ds-vuetify.css    Vuetify 생김새 덮어쓰기
│  │  ├─ theme.ts          색
│  │  ├─ defaults.ts       컴포넌트 기본값
│  │  ├─ locale.ts         한국어
│  │  └─ components/       컴포넌트 66종
│  ├─ vuetify-layer.css ← Vuetify 스타일 진입점 (레이어)
│  ├─ main.ts
│  └─ (여기부터 내가 만드는 화면)
├─ vite.config.ts
└─ tsconfig.json</code></pre>
      <p>
        <code>src/design/</code>만 디자인 시스템 것이고, 나머지는 내 프로젝트입니다.
        시스템이 갱신되면 이 폴더만 다시 복사합니다.
      </p>
    </div>`
}
