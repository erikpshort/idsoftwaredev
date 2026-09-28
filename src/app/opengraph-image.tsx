import { ImageResponse } from 'next/og';

export const alt = 'Idaho Software Development — custom software for businesses that have outgrown their tools.';
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
          justifyContent: 'flex-end',
          background: '#071014',
          padding: '72px',
        }}
      >
        <div
          style={{
            color: '#93aeb4',
            fontSize: 26,
            letterSpacing: 4,
          }}
        >
          IDAHO SOFTWARE DEVELOPMENT
        </div>
        <div
          style={{
            color: '#e8f3f5',
            fontSize: 68,
            lineHeight: 1.05,
            marginTop: 24,
            maxWidth: 980,
          }}
        >
          Custom software for businesses that have outgrown their tools.
        </div>
        <div
          style={{
            marginTop: 36,
            height: 6,
            width: 220,
            background: 'linear-gradient(90deg, #1a6270, #4890A0, #9ed7e2)',
          }}
        />
      </div>
    ),
    size,
  );
}
