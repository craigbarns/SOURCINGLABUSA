import { ImageResponse } from 'next/og';

export const alt = 'Sourcing Lab USA — China sourcing and product supply';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f7f5ef',
          color: '#243a2f',
          padding: '58px 70px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 26,
            borderBottom: '1px solid #d9ddd2',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="40" height="44" viewBox="0 0 40 44" fill="none">
              <path
                d="m5 12 15-9 15 9v19l-15 9-15-9V12Zm0 0 15 9 15-9M20 21v19M12 8l15 9v9"
                stroke="#243a2f"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{ fontSize: 27, fontWeight: 600, letterSpacing: -1.5 }}
            >
              SourcingLab
            </span>
            <span
              style={{
                fontSize: 11,
                border: '1px solid #aebc9f',
                padding: '5px 7px',
                letterSpacing: 2,
              }}
            >
              USA
            </span>
          </div>
          <span style={{ color: '#596755', fontSize: 14 }}>
            MIAMI, 2027 · PLANNED U.S. LAUNCH
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 15, letterSpacing: 3, color: '#596755' }}>
            CHINA SOURCING & PRODUCT SUPPLY
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: -4.5,
              marginTop: 24,
            }}
          >
            <span>Products.</span>
            <span>Sourced in China.</span>
          </div>
          <span style={{ fontSize: 23, color: '#596755', marginTop: 25 }}>
            Clothing and packaging specialists. Other products on request.
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #d9ddd2',
            paddingTop: 25,
          }}
        >
          <span style={{ fontSize: 18 }}>sourcinglabusa.com</span>
          <span
            style={{
              fontSize: 15,
              color: '#ffffff',
              background: '#2a4435',
              padding: '14px 21px',
              borderRadius: 4,
            }}
          >
            Let’s build your next product ↗
          </span>
        </div>
      </div>
    ),
    size,
  );
}
