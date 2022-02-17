import React, {FC, useEffect, useLayoutEffect} from 'react';
import { AppRouter } from './components';
import { ReviewData } from './utils';
export const App: FC = () => {
  useEffect(() => {
    ReviewData.save()
  }, [])
  return (
    <AppRouter />
  );
}
