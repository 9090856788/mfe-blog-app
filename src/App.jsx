import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import config from './config.json';
import { loadRemote } from './loadRemote';

function App() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const remoteRoutes = await Promise.all(
        config.routes.map(async (r) => {
          const Component = (await loadRemote(r.remoteEntry, r.module, r.component)).default;
          return { path: r.path, Component };
        })
      );
      setRoutes(remoteRoutes);
    };

    fetchRoutes();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }, idx) => (
          <Route key={idx} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
