import Link from 'next/link';

const linkStyle = {
  marginRight: 15,
};

export default function Header() {
  return (
    <div>
      <div className="header">Next level web service</div>
      <div className="navigation">
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/asteroids">
          <a style={linkStyle}>Asteroids</a>
        </Link>
        <Link href="/solarflares">
          <a style={linkStyle}>Solar flares</a>
        </Link>
      </div>

      <style jsx>
        {`
          .header {
            font-size: 24px;
            margin-bottom: 16px;
          }

          .navigation {
            border-top: 1px solid #DDD;
            border-bottom: 1px solid #DDD;
            padding: 8px 0;
          }
        `}
      </style>
    </div>
  );
}
