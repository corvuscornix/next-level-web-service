import Header from './Header';

export default function Layout(props) {
  return (
    <div className="layout">
      <Header />
      {props.children}

      <style jsx global>
        {`
          .layout {
            margin: 20px auto 0 auto;
            padding: 24px;
            background: white;
            max-width: 800px;
            padding-bottom: 48px;
           }

           .results {
            margin-top: 24px;
          }

          h1, h2, h3 {
            font-weight: 600;
          }
        `}

      </style>
    </div>
  );
}
