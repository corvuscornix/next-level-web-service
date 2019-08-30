import Link from 'next/link';
import { useRouter } from 'next/router';

const pages = {
  '/': 'Home',
  '/asteroids': 'Asteroids',
  '/solarflares': 'Solar flares',
};

const linkStyle = {
  marginRight: 15,
};

export default function Header() {
  const router = useRouter();

  return (
    <div>
      <div className="header">Next level web service</div>
      <div className="navigation">

        {Object.entries(pages).map(([path, title]) => (
          <Link key={path} href={path} as={path}>
            <a style={{ ...linkStyle, background: router.route == path ? 'rgba(1,1,1,0.1)' : null }}>{title}</a>
          </Link>

        ))}
      </div>

      <style jsx>
        {`
          .header {
            font-size: 24px;
            margin-bottom: 16px;
          }

          .navigation {
            padding: 8px 0;
            margin-bottom: 24px;
          }

          a {
            text-transform: uppercase;
            text-decoration: none;
            padding: 16px;
          }

          a:hover {
            background: rgba(1,1,1,0.1);
          }
        `}
      </style>
    </div>
  );
}
