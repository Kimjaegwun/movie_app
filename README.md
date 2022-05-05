## `폴더 구조`

- src
  - components
    - Slide, List, Loader...
  - navigation
    - root
  - screens
    - screen1
      - index
      - components...
    - screen2
      - index
      - components...
  - types
  - api

* components - 중복 사용 컴포넌트들을 분류
* navigation - root를 만들어 stack navigator 구조 생성
* screens - vac 패턴 적용
* types - typescript 형식을 고려하여 type에 대한 변수 생성

## `VAC Pattern`

- VAC는 View Asset Component의 약자로 렌더링에 필요한 JSX와 스타일을 관리하는 컴포넌트를 의미합니다.
  VAC 패턴은 View 컴포넌트에서 JSX 영역을 Props Object로 추상화하고, JSX를 VAC로 분리해서 개발하는 설계 방법
  비즈니스 로직과 UI 기능 같은 View 로직에서도 렌더링 관심사를 분리하여 관리를 수월하게 한다.

  참고영상: https://tv.naver.com/v/23162062

## `React-Query`

- Data Fetching 라이브러리로 상태관리를 좀 더 쉽게하고, caching / polling등 다양한 기능을 제공

  정리글: https://velog.io/@familyman80/React-Query-%ED%95%9C%EA%B8%80-%EB%A9%94%EB%89%B4%EC%96%BC

  참고글: https://techblog.woowahan.com/6339/
