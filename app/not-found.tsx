import Button from "@/components/ui/Button";

// S-90 404 (사용자 UI §1 — PR-B)
export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-4xl font-medium text-accent">404</p>
      <h1 className="mb-3 text-2xl">페이지를 찾을 수 없습니다</h1>
      <p className="mb-8 text-muted">
        주소가 바뀌었거나 삭제된 페이지입니다.
      </p>
      <div className="flex gap-3">
        <Button href="/">홈으로</Button>
        <Button href="/blog" variant="secondary">
          블로그 보기
        </Button>
      </div>
    </section>
  );
}
