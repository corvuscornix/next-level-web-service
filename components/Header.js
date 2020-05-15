import Link from 'next/link';
import { useRouter } from 'next/router';

const pages = {
  '/': 'Home',
  '/asteroids': 'Asteroids',
  '/solarflares': 'Solar flares',
};

export default function Header() {
  const router = useRouter();

  return (
    <div>
      <div className="header">Next level web service</div>
      <div className="navigation">
        {Object.entries(pages).map(([path, title]) => (
          <Link key={path} href={path} as={path}>
            <a
              style={
                router.route == path ? { background: 'rgba(1,1,1,0.1)' } : null
              }
            >
              {title}
            </a>
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
            display: flex;
            overflow: hidden;
            flex-wrap: nowrap;
            justify-content: space-evenly;
          }

          a {
            text-transform: uppercase;
            text-decoration: none;
            padding: 16px;
            display: flex;
            text-align: center;
            align-items: center;
          }

          a:hover {
            background: rgba(1, 1, 1, 0.1);
          }
        `}
      </style>
    </div>
  );
}
