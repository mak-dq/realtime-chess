// pages/500.tsx

import Footer from './Footer';

export default function Layout({children}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
