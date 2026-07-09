# 메디컬블룸 코엑스점 사이트 배포 안내

이 폴더(배포용_publish)를 통째로 올리면 된다.
구성: index.html(메인), admin.html(관리자 데모), pages/(서브페이지), en/·jp/·cn/(다국어), css/·js/·img/·assets/(리소스), logo.svg(로고).

## 방법 A — Netlify (가장 쉬움, 추천)
1. netlify.com 가입 (Google 계정으로 가능)
2. 로그인 후 Sites → "Add new site" → "Deploy manually"
3. 이 폴더를 통째로 드래그 앤 드롭 (375MB라 업로드에 몇 분 소요)
4. 몇 초 후 `xxxx.netlify.app` 주소 생성 완료
5. Site settings → Change site name 에서 주소 변경 가능 (예: medicalbloom-proto.netlify.app)

## 방법 B — GitHub Pages
1. github.com 가입 → New repository (이름 예: medicalbloom-proto, Public)
2. 파일이 많아 웹 업로드보다 git 사용 권장:
   ```
   cd "D:\000. AI Agent\Claude\Medical Bloom\배포용_publish"
   git init -b main
   git add .
   git commit -m "Initial commit: Medical Bloom COEX website"
   git remote add origin https://github.com/<계정명>/<저장소명>.git
   git push -u origin main
   ```
3. Settings → Pages → Branch: main / root → Save
4. 1~2분 후 `아이디.github.io/저장소명` 주소 생성

## 주소
- 메인: 기본 주소 (index.html) / 영어 `/en/` · 일본어 `/jp/` · 중국어 `/cn/`
- 관리자 데모: 기본 주소 뒤에 `/admin.html` (계정 admin / bloom2026)

## 주의
- 올리는 순간 URL을 아는 누구나 볼 수 있다. 내부 검토용으로 주소 관리.
- Vimeo 영상·웹폰트는 CDN 참조라 인터넷 연결 필요.
- 관리자 데모의 설정 변경은 보는 사람 본인 브라우저(localStorage)에만 반영되는 시안 기능이다.
- '고객 경험 스토리'의 비포&애프터는 AI 연출 이미지다. 실제 대외 홍보용 공개 전에는 실제 후기 사진 교체 또는 의료광고 심의 필요.
