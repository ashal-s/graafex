/** Sticky page background. It stays put while this page scrolls, then leaves with the page. */
export default function PageStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-stage">
      <div className="page-stage__bg" aria-hidden />
      {children}
    </div>
  );
}
