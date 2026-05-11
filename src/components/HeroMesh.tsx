export function HeroMesh() {
  return (
    <div className="hero-mesh" aria-hidden>
      <div
        className="blob"
        style={{
          width: 600,
          height: 600,
          top: '-10%',
          left: '-10%',
          background: 'oklch(0.6 0.2 290)',
        }}
      />
      <div
        className="blob"
        style={{
          width: 480,
          height: 480,
          top: '20%',
          right: '-5%',
          background: 'oklch(0.7 0.18 320)',
        }}
      />
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          bottom: '-15%',
          left: '30%',
          background: 'oklch(0.78 0.14 95)',
        }}
      />
    </div>
  );
}
