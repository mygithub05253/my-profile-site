import { profileData } from "#velite";

// 프로필 데이터 — content-hub data/profile.yml (ADR-11, 하드코딩 이관)
// 수정은 content-hub에서만 한다. 추후 profile-admin CRUD 대상(FR-M23)
export const profile = profileData;

export type Profile = typeof profileData;
export type Highlight = Profile["highlights"][number];
