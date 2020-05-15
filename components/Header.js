import Link from 'next/link';
import { useRouter } from 'next/router';

const linkStyle = {
  marginRight: 15,
};

const pages = {
  '/': 'Home',
  '/asteroids': 'Asteroids',
  '/solarflares': 'Solar flares',
};

export default function Header() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div>
      <div className="header">Next level web service</div>
      <div className="navigation">
        {Object.entries(pages).map((page) => (
          <Link href={page[0]}>
            <a style={Object.assign(linkStyle, router.pathname === page[0] && { background: 'yellow' })} onClick={handleClick}>{page[1]}</a>
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
            position: relative;
            display: flex;
            justify-content: space-between;
            height: auto;
          }

          a {
            background: gray;
            padding: 16px;
            margin: 0 8px;
            color: white;
            flex-grow: 1;
            text-align: center;
            text-transform: uppercase;
            text-decoration: none;
          }

          a:hover {
            background: red;
          }

          a.active {
            background: green;
          }
        `}
      </style>
    </div>
  );
}
