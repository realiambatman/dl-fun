import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Force a re-render without flickering by using React Router navigation
    const fullPath = pathname + search;
    navigate(fullPath, { replace: true });
  }, [pathname, search, navigate]);

  return null;
};

export default ScrollToTop;