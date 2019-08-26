import Header from './Header';

export default function Layout(props) {
  return (
    <div className="layout">
      <Header />
      {props.children}

      <style jsx global>
        {`
          .layout {
            font-family: 'Arial';
            margin: 20px;
            padding: 20px;
            border: 1px solid #DDD;
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
