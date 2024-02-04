import useScrollToAnchor from 'hooks/useScrollToAnchor';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

function testHook() {
  const { hash } = useScrollToAnchor();

  useEffect(() => {
    if (hash) {
      <Navigate to={hash} />;
    }
  });

  return (
    <>
      <Link to="#scroll-hash">Click here</Link>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div id="scroll-hash">Title</div>
    </>
  );
}
