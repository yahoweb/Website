document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // CURSOR — 커스텀 점 + 지연 링
  // dot은 즉시 이동, ring은 lerp 0.14로 부드럽게 뒤따라옴
  // ============================================================
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .14;
    ry += (my - ry) * .14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // 링크/버튼 hover → 커서 블로브로 변환
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ============================================================
  // NAV SCROLL — 스크롤 40px 이상 시 하단 보더 표시
  // ============================================================
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ============================================================
  // SCROLL REVEAL — .reveal 요소가 뷰포트에 진입 시 fadeUp 애니메이션
  // threshold 0.06 = 요소의 6%가 보일 때 트리거
  // ============================================================
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ============================================================
  // STICKY TOPS — 각 .stack-row의 top 값을 동적으로 계산
  // nav 높이 + 앞선 row들의 높이를 누적해서 할당
  // 폰트 로드 후 정확한 offsetHeight를 얻기 위해 fonts.ready 사용
  // ============================================================
  document.fonts.ready.then(() => {
    const rows = document.querySelectorAll('.stack-blocks > .stack-row');
    const navH = document.querySelector('nav').offsetHeight;
    let accTop = navH;
    rows.forEach(row => {
      row.style.top = accTop + 'px';
      accTop += row.offsetHeight;
    });
  });

  // ============================================================
  // "VIEW ↗" CURSOR PILL — .stack-row hover 시 마우스 따라다님
  // ============================================================
  const viewCursor = document.getElementById('viewCursor');
  let onRow = false;

  document.querySelectorAll('.stack-blocks > .stack-row:not(.stack-row--upcoming)').forEach(row => {
    row.addEventListener('mouseenter', () => { viewCursor.classList.add('visible'); onRow = true; });
    row.addEventListener('mouseleave', () => { viewCursor.classList.remove('visible'); onRow = false; });
  });

  document.addEventListener('mousemove', e => {
    if (onRow) {
      viewCursor.style.left = e.clientX + 'px';
      viewCursor.style.top  = e.clientY + 'px';
    }
  });

  // ============================================================
  // YEAR — 푸터 연도 자동 갱신
  // ============================================================
  document.getElementById('year').textContent = new Date().getFullYear();

});
