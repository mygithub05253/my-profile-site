# 연동 API 통합명세서 v1.0 변경사항

> 2026-07-04 (KST) · **신규 제정** (이전 버전 없음)

## 배경

API 계약이 아키텍처 설계서 5장·마스터인덱스 변경 노트·메모리에 흩어져 있었고, E2E 과정에서 발견된 결함(403 2건, ref 충돌, 스로틀)의 계약상 의미가 문서화되지 않았다.

## 조치

| CN | 내용 | 근거 |
|----|------|------|
| CN-1 | API 도메인 신설 — 외부 소비 계약 5종을 as-built로 정본화 | velog_publish.py·워크플로 4종 |
| CN-2 | velog GraphQL 제약 명세화 (Cookie 전용, operationName/tags/meta 필수, null=실패, 5분 10개) | Phase 0 리서치 + 백필 운영 |
| CN-3 | 워크플로 이벤트 계약 5종(E-1~E-5) + 루프 가드·백스톱 규칙 표준화 | E2E 검증 이력 |
| CN-4 | **profile-admin 내부 API 계약 초안** — CRUD 5라우트, sha 낙관적 잠금, allowlist 인증 | 요구사항 정의서 5장 |
| CN-5 | velog-publish 경로 필터(`projects/**` 제외)를 계약으로 승격 → PR-A 구현 요건 | UI 명세서 7장 |
| CN-6 | 토큰 관리 총괄표 + 만료 캘린더 | 운영 교훈 |

## 미결 (v1.1 후보)

- profile-admin 저장 브랜치 정책: main 직접 커밋 vs `admin/*`+PR — **사용자 결정 필요** (기본안: 후자)
- P1/P2 라우트 상세 스키마 (P0 구현 후)
