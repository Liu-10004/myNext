import Router from 'next/router';

function Index({ isServer }) {
  console.log('render', new Date());

  return (
    <div>
      <h1>Home page. Is it on server? - {isServer ? 'Yes' : 'No'}</h1>

      <button type="button" onClick={() => Router.push('/')}>
        Reload me
      </button>
    </div>
  );
}

Index.getInitialProps = async ({ req }) => {
  return { isServer: !!req };
};

export default Index;
