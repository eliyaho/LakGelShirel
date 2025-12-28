'use client';

import { Provider } from 'react-redux';
import store from '@/components/redax/store';
import { UiStateProvider } from '@/hooks/context/UiStateProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <UiStateProvider>
        {children}
      </UiStateProvider>
    </Provider>
  );
}
