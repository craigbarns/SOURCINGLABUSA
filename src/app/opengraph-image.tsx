import { ImageResponse } from 'next/og';

export const alt = 'Sourcing Lab USA — Custom packaging and textile';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#070a09',
          color: '#f4f8f5',
          fontFamily: 'Arial, sans-serif',
          padding: '74px 82px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 560,
            height: 560,
            borderRadius: 999,
            right: -120,
            top: -220,
            background: 'rgba(112,225,178,0.12)',
            filter: 'blur(4px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.13,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(199,255,107,.35)',
                background: '#111714',
                color: '#c7ff6b',
                fontWeight: 900,
                fontSize: 27,
              }}
            >
              S
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 27, fontWeight: 800, letterSpacing: -1 }}>
                SourcingLab
              </span>
              <span
                style={{
                  border: '1px solid rgba(199,255,107,.3)',
                  borderRadius: 7,
                  color: '#dfffab',
                  padding: '6px 8px',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                USA
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 920 }}>
            <div
              style={{
                color: '#a9eecf',
                fontSize: 17,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Custom packaging and textile
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 22,
                fontSize: 66,
                lineHeight: 1.02,
                letterSpacing: -4,
                fontWeight: 900,
              }}
            >
              <div>Built around</div>
              <div style={{ color: '#c7ff6b' }}>your product brief.</div>
            </div>
            <div
              style={{
                marginTop: 24,
                color: '#96a29b',
                fontSize: 23,
                lineHeight: 1.4,
              }}
            >
              From product brief to direct delivery, through an established
              China sourcing partnership.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22, color: '#8d9a92' }}>
            {['Custom packaging', 'Custom textile', 'China sourcing', 'Miami · 2027'].map(
              (item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 99,
                      background: '#70e1b2',
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{item}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
